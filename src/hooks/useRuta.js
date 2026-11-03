import { useEffect, useState } from 'react'

// Navegación sin librerías: la pantalla actual vive en el estado y se sincroniza con
// la dirección (#/herramientas, #/anonimizar?tipo=csv). Así funcionan los botones
// «atrás» y «adelante» del navegador y se pueden compartir enlaces.
function leerHash() {
  const crudo = window.location.hash.replace(/^#\/?/, '')
  const [pantalla, consulta = ''] = crudo.split('?')
  return { pantalla: pantalla || 'inicio', tipo: new URLSearchParams(consulta).get('tipo') }
}

export default function useRuta() {
  const [ruta, setRuta] = useState(leerHash)

  useEffect(() => {
    const alCambiar = () => setRuta(leerHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  return ruta
}
