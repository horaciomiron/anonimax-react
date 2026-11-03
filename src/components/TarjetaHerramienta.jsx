import Tarjeta from './Tarjeta.jsx'
import Enlace from './Enlace.jsx'

// Tarjeta de una herramienta: reutiliza <Tarjeta> y agrega favorito y enlace.
export default function TarjetaHerramienta({ herramienta, esFavorita, onFavorito }) {
  const h = herramienta
  const insignias = (
    <div className="tool__top">
      <span className="badge badge--accent">{h.ext}</span>
      {!h.disponible && <span className="badge badge--muted">Próximamente</span>}
    </div>
  )
  return (
    <Tarjeta titulo={h.titulo} texto={h.descripcion} arriba={insignias} className={`tool${h.disponible ? '' : ' tool--soon'}`}>
      <div className="actions">
        {h.disponible ? (
          <Enlace a="anonimizar" tipo={h.id} className="btn btn--primary btn--sm" aria-label={`Usar herramienta: ${h.titulo}`}>
            Usar herramienta →
          </Enlace>
        ) : (
          <span className="btn btn--ghost btn--sm" aria-disabled="true">No disponible aún</span>
        )}
        <button className="btn btn--ghost btn--sm" type="button" aria-pressed={esFavorita}
          aria-label={`${esFavorita ? 'Quitar de favoritos' : 'Marcar como favorita'}: ${h.titulo}`}
          onClick={() => onFavorito(h.id)}>
          {esFavorita ? '★ Favorita' : '☆ Favorita'}
        </button>
      </div>
    </Tarjeta>
  )
}
