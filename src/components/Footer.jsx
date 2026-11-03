import Enlace from './Enlace.jsx'
import Logo from './Logo.jsx'
import { PANTALLAS } from '../data/contenido.js'

const ANIO = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo />
        <nav aria-label="Pie de página">
          <ul>
            {PANTALLAS.map((p) => (
              <li key={p.id}><Enlace a={p.id}>{p.titulo}</Enlace></li>
            ))}
          </ul>
        </nav>
        <small>© {ANIO} ANONIMAX · PROYECTO ACADÉMICO</small>
      </div>
    </footer>
  )
}
