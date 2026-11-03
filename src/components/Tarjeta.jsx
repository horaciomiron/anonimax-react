// Componente reutilizable #1: una tarjeta con título y descripción.
// Se usa en la portada (capacidades) y en Herramientas (con insignias y acción).
// Props: titulo, texto, arriba (insignias), children (acciones) y className.
export default function Tarjeta({ titulo, texto, arriba, className = '', children }) {
  return (
    <article className={`card ${className}`.trim()}>
      {arriba}
      <h3 className="card__title">{titulo}</h3>
      <p>{texto}</p>
      {children}
    </article>
  )
}
