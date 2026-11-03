import { forwardRef } from 'react'
import Anonimax from '../lib/anonymizer.js'

const LIMITE_VISTA = 100000

// Texto original con los datos resaltados (<mark>). Sin innerHTML: React escapa todo.
function Original({ partes }) {
  let usados = 0
  const bloques = []
  for (let n = 0; n < partes.length; n++) {
    if (usados > LIMITE_VISTA) break
    const parte = partes[n]
    bloques.push(
      <span key={n}>
        {parte.etiqueta && `— ${parte.etiqueta} —\n`}
        {Anonimax.segmentar(parte.texto, parte.hallazgos).map((s, i) =>
          s.tipo
            ? <mark key={i} title={Anonimax.TIPOS[s.tipo].etiqueta}>{s.texto}</mark>
            : <span key={i}>{s.texto}</span>)}
        {'\n'}
      </span>,
    )
    usados += parte.texto.length
  }
  return bloques
}

// Resultado: resumen, avisos, comparación y botones. El título recibe el foco (ref).
const Resultado = forwardRef(function Resultado({ datos, anonimizado, onDescargar, onDescargarTxt, onCopiar }, tituloRef) {
  const { partes, resumen, avisos, salida } = datos
  const tipos = Object.keys(resumen)
  const recortado = partes.reduce((a, p) => a + p.texto.length, 0) > LIMITE_VISTA || anonimizado.length > LIMITE_VISTA

  return (
    <section aria-labelledby="titulo-resultado" className="mt-4">
      <h2 id="titulo-resultado" ref={tituloRef} tabIndex={-1}>Resultado</h2>
      <div className="alert mb-3">
        <p><strong>Revisá siempre el resultado.</strong> La detección automática puede dejar pasar algún dato o ocultar de más. Antes de compartir el documento, leelo completo.</p>
      </div>

      <ul className="summary" aria-label="Datos encontrados">
        {tipos.length === 0 && <li>No se encontraron datos con los tipos elegidos.</li>}
        {tipos.map((t) => <li key={t}>{Anonimax.TIPOS[t].etiqueta}: <strong>{resumen[t]}</strong></li>)}
      </ul>

      <div className="compare">
        <div className="viewer-wrap">
          <h3 id="titulo-original">Original (datos resaltados)</h3>
          <div className="viewer" tabIndex={0} role="region" aria-labelledby="titulo-original"><Original partes={partes} /></div>
        </div>
        <div className="viewer-wrap">
          <h3 id="titulo-anonimizado">Anonimizado</h3>
          <div className="viewer" tabIndex={0} role="region" aria-labelledby="titulo-anonimizado">
            {anonimizado.length > LIMITE_VISTA ? anonimizado.slice(0, LIMITE_VISTA) : anonimizado}
          </div>
        </div>
      </div>

      {avisos.length > 0 && (
        <div className="alert alert--error mb-3">
          {avisos.map((a) => <p key={a}>{a}</p>)}
        </div>
      )}
      {recortado && <p className="hint">Vista previa limitada a los primeros 100.000 caracteres. El archivo descargado contiene el documento completo.</p>}

      <div className="actions mt-3">
        <button className="btn btn--primary" type="button" onClick={onDescargar}>Descargar anonimizado</button>
        <button className="btn btn--ghost" type="button" onClick={onCopiar}>Copiar texto</button>
        {salida.blob && <button className="btn btn--ghost" type="button" onClick={onDescargarTxt}>Descargar texto (.txt)</button>}
      </div>
    </section>
  )
})

export default Resultado
