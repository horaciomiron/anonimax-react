import { useEffect, useRef, useState } from 'react'
import Campo from '../components/Campo.jsx'
import Opcion from '../components/Opcion.jsx'
import Resultado from '../components/Resultado.jsx'
import { MODOS, TIPOS_DATOS } from '../data/contenido.js'
import { descargar, extensionDe } from '../lib/descargas.js'
import { EXTENSIONES, FORMATO_POR_EXT, MAX_BYTES, PdfEscaneado, TIPO_MIME, procesar, textoAnonimizado } from '../lib/procesar.js'

// Pantalla principal. TODO lo que cambia vive acá, en estado:
//   origen, archivo, texto, formato, tipos, extras, modo  → el formulario (controlado)
//   errores, estado, procesando                           → mensajes y botón
//   resultado                                              → lo que se muestra abajo
export default function Anonimizar({ tipo }) {
  const [origen, setOrigen] = useState(tipo === 'texto' ? 'texto' : 'archivo')
  const [archivo, setArchivo] = useState(null)
  const [texto, setTexto] = useState('')
  const [formato, setFormato] = useState(FORMATO_POR_EXT[tipo] || 'texto')
  const [tipos, setTipos] = useState(() => TIPOS_DATOS.filter((t) => t.activo).map((t) => t.valor))
  const [extras, setExtras] = useState('')
  const [modo, setModo] = useState('etiquetas')

  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('')
  const [procesando, setProcesando] = useState(false)
  const [arrastrando, setArrastrando] = useState(false)
  const [resultado, setResultado] = useState(null)

  const tituloResultado = useRef(null)
  const inputArchivo = useRef(null)

  // Cuando aparece un resultado nuevo, el foco va al título (lo anuncia el lector de pantalla)
  useEffect(() => {
    if (resultado && tituloResultado.current) {
      tituloResultado.current.focus()
      tituloResultado.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [resultado])

  const aceptar = EXTENSIONES.includes(tipo) ? `.${tipo}` : '.docx,.pdf,.txt,.csv,.tsv,.json,.xml,.html,.htm,.md,.log'

  function alternarTipo(valor) {
    setTipos((actuales) => (actuales.includes(valor) ? actuales.filter((t) => t !== valor) : [...actuales, valor]))
  }

  function validar() {
    const nuevos = {}
    if (origen === 'archivo') {
      if (!archivo) nuevos.origen = 'Elegí un archivo para continuar.'
      else {
        const ext = extensionDe(archivo.name)
        if (!EXTENSIONES.includes(ext)) {
          const extra = ['doc', 'rtf', 'odt'].includes(ext) ? ' Guardalo como .docx desde Word («Guardar como») y volvé a subirlo.' : ''
          nuevos.origen = `El formato .${ext || '(sin extensión)'} no está soportado.${extra}`
        } else if (archivo.size > MAX_BYTES) nuevos.origen = 'El archivo supera los 15 MB.'
      }
    } else if (!texto.trim()) nuevos.origen = 'Pegá el texto que querés anonimizar.'

    if (!tipos.length && !extras.trim()) nuevos.tipos = 'Marcá al menos un tipo de dato o escribí una palabra adicional.'
    setErrores(nuevos)
    return nuevos
  }

  async function enviar(e) {
    e.preventDefault()
    const nuevos = validar()
    if (Object.keys(nuevos).length) {
      const id = nuevos.origen ? (origen === 'archivo' ? 'archivo' : 'texto') : 'extras'
      document.getElementById(id)?.focus()
      return
    }
    setProcesando(true)
    setResultado(null)
    setEstado('Procesando…')
    try {
      const opciones = { tipos, extras: extras.split(','), modo }
      const r = await procesar({ origen, archivo, texto, formato, opciones }, setEstado)
      const total = Object.values(r.resumen).reduce((a, b) => a + b, 0)
      setResultado({ ...r, anonimizado: textoAnonimizado(r.partes) })
      setEstado(total
        ? `Listo: se ocultaron ${total} datos. Revisá el resultado más abajo.`
        : 'Listo, pero no se encontró ningún dato con los tipos elegidos.')
    } catch (error) {
      if (error instanceof PdfEscaneado) {
        setEstado('')
        setErrores({ origen: 'Este PDF no tiene texto que se pueda leer (parece escaneado, es decir una foto del documento). No generamos un archivo para no darte una falsa sensación de seguridad: todavía no incluimos OCR.' })
      } else {
        setEstado('No pudimos procesar el archivo. Puede estar dañado, protegido con contraseña o no ser un documento válido.')
        console.error(error)
      }
    } finally {
      setProcesando(false)
    }
  }

  function limpiar() {
    setOrigen(tipo === 'texto' ? 'texto' : 'archivo')
    setArchivo(null); setTexto(''); setExtras(''); setModo('etiquetas')
    setFormato(FORMATO_POR_EXT[tipo] || 'texto')
    setTipos(TIPOS_DATOS.filter((t) => t.activo).map((t) => t.valor))
    setErrores({}); setEstado(''); setResultado(null)
    if (inputArchivo.current) inputArchivo.current.value = ''
  }

  const salida = resultado?.salida
  const alDescargar = () => {
    if (!salida) return
    descargar(salida.blob || salida.texto, `${salida.nombre}-anonimizado.${salida.extension}`, TIPO_MIME[salida.extension] || 'text/plain')
    setEstado(`Se descargó ${salida.nombre}-anonimizado.${salida.extension}`)
  }
  const alDescargarTxt = () => salida?.textoPlano && descargar(salida.textoPlano, `${salida.nombre}-anonimizado.txt`, 'text/plain')
  const alCopiar = async () => {
    try {
      await navigator.clipboard.writeText(salida.textoPlano || salida.texto)
      setEstado('Texto anonimizado copiado al portapapeles.')
    } catch {
      setEstado('No se pudo copiar automáticamente. Seleccioná el texto y copialo a mano.')
    }
  }

  const alSoltar = (e) => {
    e.preventDefault()
    setArrastrando(false)
    if (e.dataTransfer.files.length) setArchivo(e.dataTransfer.files[0])
  }

  return (
    <>
      <section className="container page-head" aria-labelledby="titulo-anon">
        <p className="eyebrow">Herramienta {tipo && <span className="badge badge--accent">{tipo.toUpperCase()}</span>}</p>
        <h1 id="titulo-anon">Anonimizar <em>documento</em></h1>
        <p className="lead">Seguí los tres pasos. Tu archivo no sale de este dispositivo.</p>
      </section>

      <section className="container pb-5" aria-label="Anonimizador">
        <form className="workspace" onSubmit={enviar} onReset={(e) => { e.preventDefault(); limpiar() }} noValidate>

          <fieldset>
            <legend>1 · Origen del texto</legend>
            <div className="choices mb-3">
              <Opcion tipo="radio" nombre="origen" valor="archivo" titulo="Subir un archivo" marcado={origen === 'archivo'} onChange={() => { setOrigen('archivo'); setErrores({}) }} />
              <Opcion tipo="radio" nombre="origen" valor="texto" titulo="Pegar texto" marcado={origen === 'texto'} onChange={() => { setOrigen('texto'); setErrores({}) }} />
            </div>

            {origen === 'archivo' ? (
              <div className="field">
                <div className={`dropzone${arrastrando ? ' is-over' : ''}`}
                  onDragEnter={(e) => { e.preventDefault(); setArrastrando(true) }}
                  onDragOver={(e) => { e.preventDefault(); setArrastrando(true) }}
                  onDragLeave={(e) => { e.preventDefault(); setArrastrando(false) }}
                  onDrop={alSoltar}>
                  <label htmlFor="archivo" className="label">Archivo (Word, PDF, TXT, CSV, JSON, XML, HTML, MD · hasta 15 MB)</label>
                  <input ref={inputArchivo} type="file" id="archivo" accept={aceptar}
                    aria-describedby="ayuda-archivo error-origen" aria-invalid={errores.origen ? 'true' : undefined}
                    onChange={(e) => { setArchivo(e.target.files[0] || null); setErrores({}) }} />
                  <p className="hint" id="ayuda-archivo">
                    {archivo ? `Archivo elegido: ${archivo.name}. ` : ''}
                    También podés arrastrar el archivo hasta este recuadro. ¿Querés probar? Descargá un <a href="./muestras/ejemplo.txt" download>ejemplo de prueba</a>.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="field">
                  <label htmlFor="texto">Texto a anonimizar</label>
                  <textarea id="texto" spellCheck="false" placeholder="Pegá acá el contenido del documento…" value={texto}
                    aria-describedby="error-origen" aria-invalid={errores.origen ? 'true' : undefined}
                    onChange={(e) => setTexto(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="formato">Formato del texto pegado</label>
                  <select id="formato" value={formato} onChange={(e) => setFormato(e.target.value)}>
                    <option value="texto">Texto plano</option>
                    <option value="csv">CSV (con encabezados)</option>
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                  </select>
                </div>
              </div>
            )}
            <p className="error" id="error-origen" role="alert">{errores.origen}</p>
          </fieldset>

          <fieldset>
            <legend>2 · Qué datos ocultar</legend>
            <div className="choices">
              {TIPOS_DATOS.map((t) => (
                <Opcion key={t.valor} tipo="checkbox" nombre="tipos" valor={t.valor} titulo={t.titulo} ayuda={t.ayuda}
                  marcado={tipos.includes(t.valor)} onChange={() => alternarTipo(t.valor)} />
              ))}
            </div>
            <p className="error" id="error-tipos" role="alert">{errores.tipos}</p>
            <Campo id="extras" etiqueta="Palabras adicionales (opcional)" ayuda="Separalas con comas. Se ocultan siempre, sin importar mayúsculas.">
              <input type="text" id="extras" placeholder="Ej.: Estudio Gómez & Asociados, Proyecto Aurora"
                aria-describedby="ayuda-extras" value={extras} onChange={(e) => setExtras(e.target.value)} />
            </Campo>
          </fieldset>

          <fieldset>
            <legend>3 · Cómo ocultarlos</legend>
            <div className="choices">
              {MODOS.map((m) => (
                <Opcion key={m.valor} tipo="radio" nombre="modo" valor={m.valor} titulo={m.titulo} ayuda={m.ayuda}
                  marcado={modo === m.valor} onChange={() => setModo(m.valor)} />
              ))}
            </div>
          </fieldset>

          <div className="actions">
            <button className="btn btn--primary" type="submit" disabled={procesando}>
              {procesando ? 'Procesando…' : 'Anonimizar documento'}
            </button>
            <button className="btn btn--ghost" type="reset">Limpiar todo</button>
          </div>
        </form>

        <p className="hint mt-2" role="status" aria-live="polite">{estado}</p>

        {resultado && (
          <Resultado ref={tituloResultado} datos={resultado} anonimizado={resultado.anonimizado}
            onDescargar={alDescargar} onDescargarTxt={alDescargarTxt} onCopiar={alCopiar} />
        )}
      </section>
    </>
  )
}
