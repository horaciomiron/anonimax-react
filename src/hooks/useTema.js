import { useEffect, useState } from 'react'

// Modo claro / oscuro guardado en el estado. Cuando cambia, useEffect actualiza la página
// y recuerda la elección en el navegador.
export default function useTema() {
  const [tema, setTema] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    try { localStorage.setItem('anonimax-tema', tema) } catch { /* sin almacenamiento: no pasa nada */ }
  }, [tema])

  const alternar = () => setTema((t) => (t === 'light' ? 'dark' : 'light'))
  return [tema, alternar]
}
