// Enlace interno: apunta a #/pantalla. Un solo lugar define cómo se navega.
export default function Enlace({ a, tipo, className, actual, children, ...resto }) {
  const destino = `#/${a}${tipo ? `?tipo=${tipo}` : ''}`
  return (
    <a href={destino} className={className} aria-current={actual ? 'page' : undefined} {...resto}>
      {children}
    </a>
  )
}
