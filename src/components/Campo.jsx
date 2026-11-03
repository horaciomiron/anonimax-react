// Componente reutilizable #2: un campo de formulario con su etiqueta, ayuda y
// mensaje de error junto al campo. El control (input, select…) llega como «children».
// El mensaje de error tiene role="alert": los lectores de pantalla lo anuncian.
export default function Campo({ id, etiqueta, error, ayuda, completo = false, children }) {
  return (
    <div className={`field${completo ? ' field--full' : ''}`}>
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {ayuda && <p className="hint" id={`ayuda-${id}`}>{ayuda}</p>}
      <p className="error" id={`error-${id}`} role="alert">{error}</p>
    </div>
  )
}
