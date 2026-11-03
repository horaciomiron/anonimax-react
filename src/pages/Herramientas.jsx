import { useCallback, useEffect, useState } from 'react'
import TarjetaHerramienta from '../components/TarjetaHerramienta.jsx'
import { Cargando, ErrorCarga } from '../components/Estado.jsx'

const CATEGORIAS = [
  { id: 'todas', titulo: 'Todas' },
  { id: 'texto', titulo: 'Texto' },
  { id: 'datos', titulo: 'Datos' },
  { id: 'web', titulo: 'Web' },
  { id: 'documentos', titulo: 'Word y PDF' },
  { id: 'favoritas', titulo: 'Favoritas' },
]

const normalizar = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export default function Herramientas() {
  // Datos que vienen de afuera (public/data/herramientas.json) y sus tres estados
  const [herramientas, setHerramientas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  // Interacción: búsqueda, filtro por categoría y favoritas
  const [consulta, setConsulta] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [favoritas, setFavoritas] = useState([])

  useEffect(() => {
    const control = new AbortController()
    fetch(`${import.meta.env.BASE_URL}data/herramientas.json`, { signal: control.signal })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        return respuesta.json()
      })
      .then((datos) => { setHerramientas(datos); setCargando(false) })
      .catch((e) => {
        if (e.name === 'AbortError') return
        setError('No pudimos cargar las herramientas. Revisá tu conexión e intentá de nuevo.')
        setCargando(false)
      })
    return () => control.abort()      // si el usuario se va de la pantalla, se cancela la petición
  }, [intento])

  const reintentar = () => { setCargando(true); setError(''); setIntento((n) => n + 1) }

  const alternarFavorita = useCallback((id) => {
    setFavoritas((actuales) => (actuales.includes(id) ? actuales.filter((f) => f !== id) : [...actuales, id]))
  }, [])

  const q = normalizar(consulta.trim())
  const visibles = herramientas.filter((h) => {
    const coincideCategoria = categoria === 'todas' || (categoria === 'favoritas' ? favoritas.includes(h.id) : h.categoria === categoria)
    return coincideCategoria && normalizar(`${h.titulo} ${h.ext} ${h.descripcion} ${h.categoria}`).includes(q)
  })

  return (
    <>
      <section className="container page-head" aria-labelledby="titulo-herr">
        <p className="eyebrow">Herramientas</p>
        <h1 id="titulo-herr">Elegí tu <em>herramienta</em></h1>
        <p className="lead">Cada tipo de archivo tiene su propia lectura: en un CSV se ocultan columnas enteras, en un JSON se respeta la estructura y en un Word se conserva el formato.</p>
      </section>

      <section className="container pb-5" aria-labelledby="titulo-lista">
        <h2 id="titulo-lista" className="visually-hidden">Lista de herramientas</h2>

        <form className="toolbar" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="field field--flush">
            <label htmlFor="buscar">Buscar herramienta</label>
            <input type="search" id="buscar" placeholder="Ej.: csv, planilla, word…" autoComplete="off"
              value={consulta} onChange={(e) => setConsulta(e.target.value)} />
          </div>
          <fieldset className="chips" aria-label="Filtrar por categoría">
            <legend className="visually-hidden">Categoría</legend>
            {CATEGORIAS.map((c) => (
              <button key={c.id} className="chip" type="button" aria-pressed={categoria === c.id} onClick={() => setCategoria(c.id)}>
                {c.titulo}{c.id === 'favoritas' ? ` (${favoritas.length})` : ''}
              </button>
            ))}
          </fieldset>
        </form>

        {cargando && <Cargando texto="Cargando herramientas…" />}
        {error && <ErrorCarga mensaje={error} onReintentar={reintentar} />}

        {!cargando && !error && (
          <>
            <p className="hint" role="status" aria-live="polite">
              {visibles.length} {visibles.length === 1 ? 'herramienta' : 'herramientas'}
            </p>
            <ul className="grid">
              {visibles.map((h) => (
                <li key={h.id}>
                  <TarjetaHerramienta herramienta={h} esFavorita={favoritas.includes(h.id)} onFavorito={alternarFavorita} />
                </li>
              ))}
            </ul>
            {visibles.length === 0 && (
              <div className="empty">
                <p><strong>No encontramos herramientas con esa búsqueda.</strong></p>
                <p className="hint">Probá con otra palabra o elegí «Todas».</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
