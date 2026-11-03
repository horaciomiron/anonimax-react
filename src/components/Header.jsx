import { useEffect, useState } from 'react'
import Enlace from './Enlace.jsx'
import Logo from './Logo.jsx'
import { PANTALLAS } from '../data/contenido.js'

// Encabezado: logo, menú (hamburguesa en celular) y botón de tema.
// Estado propio: «menuAbierto». El tema vive en App y llega por props.
export default function Header({ pantalla, tema, onAlternarTema }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Escape cierra el menú (accesibilidad)
  useEffect(() => {
    if (!menuAbierto) return undefined
    const alTeclear = (e) => { if (e.key === 'Escape') setMenuAbierto(false) }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [menuAbierto])

  const esClaro = tema === 'light'

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span className="visually-hidden">{menuAbierto ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span className="nav-toggle__icon" aria-hidden="true"></span>
        </button>

        <nav className={`nav${menuAbierto ? ' is-open' : ''}`} id="menu-principal" aria-label="Principal"
          onClick={(e) => { if (e.target.closest('a')) setMenuAbierto(false) }}>
          <ul className="nav__list">
            {PANTALLAS.map((p) => (
              <li key={p.id}>
                <Enlace a={p.id} actual={pantalla === p.id}>{p.titulo}</Enlace>
              </li>
            ))}
          </ul>
          <div className="nav__actions">
            <button className="btn btn--ghost btn--sm" type="button" onClick={onAlternarTema}
              aria-label={esClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}>
              {esClaro ? 'Modo oscuro' : 'Modo claro'}
            </button>
            <Enlace a="anonimizar" className="btn btn--primary btn--sm">Anonimizar ahora</Enlace>
          </div>
        </nav>
      </div>
    </header>
  )
}
