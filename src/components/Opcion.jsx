// Componente reutilizable #3: una opción (checkbox o radio) con título y ayuda.
// Se usa para «tipos de datos», «modo» y «origen» en el anonimizador.
export default function Opcion({ tipo, nombre, valor, titulo, ayuda, marcado, onChange }) {
  return (
    <label className="choice">
      <input type={tipo} name={nombre} value={valor} checked={marcado} onChange={onChange} />
      <span>{titulo}{ayuda && <small>{ayuda}</small>}</span>
    </label>
  )
}
