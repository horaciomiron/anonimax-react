import { useState } from 'react'
import Campo from './Campo.jsx'
import Enlace from './Enlace.jsx'
import { PERFILES } from '../data/contenido.js'

// Formulario controlado: cada campo está ligado al estado «valores».
// La validación escribe mensajes en «errores», que se muestran junto a cada campo.
const INICIAL = { email: '', perfil: '', volumen: '', fecha: '', acepto: false }

const reglas = {
  email: (v) => {
    const valor = v.email.trim()
    if (!valor) return 'Ingresá tu correo electrónico.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return 'El correo no parece válido. Ejemplo: nombre@dominio.com'
    return ''
  },
  perfil: (v) => (v.perfil ? '' : 'Elegí una opción de la lista.'),
  volumen: (v) => {
    if (v.volumen === '') return ''
    const n = Number(v.volumen)
    return Number.isInteger(n) && n >= 1 && n <= 100000 ? '' : 'Ingresá un número entero entre 1 y 100.000.'
  },
  fecha: (v) => {
    if (!v.fecha) return ''
    return v.fecha < new Date().toISOString().slice(0, 10) ? 'La fecha no puede ser anterior a hoy.' : ''
  },
  acepto: (v) => (v.acepto ? '' : 'Tenés que aceptar para continuar.'),
}

export default function FormularioAcceso() {
  const [valores, setValores] = useState(INICIAL)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (e) => {
    const { name, type, value, checked } = e.target
    const nuevo = { ...valores, [name]: type === 'checkbox' ? checked : value }
    setValores(nuevo)
    if (errores[name]) setErrores({ ...errores, [name]: reglas[name](nuevo) })   // corrige el error en vivo
  }

  const alSalir = (e) => {
    const { name } = e.target
    setErrores((previos) => ({ ...previos, [name]: reglas[name](valores) }))
  }

  const enviar = (e) => {
    e.preventDefault()
    setEnviado(false)
    const nuevos = {}
    Object.keys(reglas).forEach((campo) => { nuevos[campo] = reglas[campo](valores) })
    setErrores(nuevos)
    const primero = Object.keys(nuevos).find((c) => nuevos[c])
    if (primero) { e.target.elements[primero].focus(); return }   // el foco va al primer error
    setEnviado(true)
    setValores(INICIAL)
  }

  const props = (campo) => ({
    id: campo, name: campo, onChange: cambiar, onBlur: alSalir,
    'aria-invalid': errores[campo] ? 'true' : undefined,
    'aria-describedby': `error-${campo}`,
  })

  return (
    <form className="form" onSubmit={enviar} noValidate>
      <div className="form-grid">
        <Campo id="email" etiqueta="Correo electrónico" error={errores.email} completo>
          <input type="email" autoComplete="email" placeholder="correo@tudespacho.com" value={valores.email} {...props('email')} />
        </Campo>
        <Campo id="perfil" etiqueta="Soy…" error={errores.perfil}>
          <select value={valores.perfil} {...props('perfil')}>
            <option value="">Elegí una opción</option>
            {PERFILES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Campo>
        <Campo id="volumen" etiqueta="Documentos por mes (aprox.)" error={errores.volumen}>
          <input type="number" min="1" max="100000" inputMode="numeric" placeholder="Ej.: 40" value={valores.volumen} {...props('volumen')} />
        </Campo>
        <Campo id="fecha" etiqueta="¿Desde cuándo lo necesitarías?" error={errores.fecha} ayuda="Opcional." completo>
          <input type="date" value={valores.fecha} {...props('fecha')} />
        </Campo>
        <div className="field field--full">
          <label className="choice" htmlFor="acepto">
            <input type="checkbox" checked={valores.acepto} {...props('acepto')} />
            <span>Acepto recibir novedades de AnonimaX. <Enlace a="privacidad">Ver política de privacidad</Enlace>.</span>
          </label>
          <p className="error" id="error-acepto" role="alert">{errores.acepto}</p>
        </div>
      </div>
      <button className="btn btn--primary" type="submit">Avisarme →</button>
      {enviado && (
        <div className="alert alert--ok" role="status">
          ¡Listo! Te anotamos para avisarte. (Demo académica: no se envió ningún dato.)
        </div>
      )}
    </form>
  )
}
