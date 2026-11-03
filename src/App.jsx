import { useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Herramientas from './pages/Herramientas.jsx'
import Anonimizar from './pages/Anonimizar.jsx'
import Privacidad from './pages/Privacidad.jsx'
import useTema from './hooks/useTema.js'
import useRuta from './hooks/useRuta.js'
import { PANTALLAS } from './data/contenido.js'

// Componente raíz. Decide QUÉ pantalla se muestra según la ruta (renderizado condicional)
// y guarda el tema claro/oscuro, que comparten el encabezado y toda la página.
export default function App() {
  const [tema, alternarTema] = useTema()
  const { pantalla: id, tipo } = useRuta()
  const pantalla = PANTALLAS.some((p) => p.id === id) ? id : 'inicio'
  const principal = useRef(null)
  const primera = useRef(true)

  // Al cambiar de pantalla: título de la pestaña y foco al contenido (accesibilidad)
  useEffect(() => {
    const nombre = PANTALLAS.find((p) => p.id === pantalla).titulo
    document.title = pantalla === 'inicio' ? 'AnonimaX — Anonimizador de documentos en tu navegador' : `${nombre} — AnonimaX`
    if (primera.current) { primera.current = false; return }
    window.scrollTo(0, 0)
    principal.current?.focus()
  }, [pantalla])

  return (
    <>
      <a className="skip-link" href="#contenido" onClick={(e) => { e.preventDefault(); principal.current?.focus() }}>Saltar al contenido</a>
      <Header pantalla={pantalla} tema={tema} onAlternarTema={alternarTema} />
      <main id="contenido" ref={principal} tabIndex={-1}>
        {pantalla === 'inicio' && <Inicio />}
        {pantalla === 'herramientas' && <Herramientas />}
        {pantalla === 'anonimizar' && <Anonimizar key={tipo || 'libre'} tipo={tipo} />}
        {pantalla === 'privacidad' && <Privacidad />}
      </main>
      <Footer />
    </>
  )
}
