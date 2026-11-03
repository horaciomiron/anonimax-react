// Muestra los estados de una carga de datos: «Cargando…» y error con botón para reintentar.
export function Cargando({ texto = 'Cargando…' }) {
  return <p className="hint" role="status">{texto}</p>
}

export function ErrorCarga({ mensaje, onReintentar }) {
  return (
    <div className="alert alert--error" role="alert">
      <p><strong>{mensaje}</strong></p>
      {onReintentar && <button className="btn btn--ghost btn--sm" type="button" onClick={onReintentar}>Reintentar</button>}
    </div>
  )
}
