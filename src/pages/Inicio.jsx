import Enlace from '../components/Enlace.jsx'
import Tarjeta from '../components/Tarjeta.jsx'
import FormularioAcceso from '../components/FormularioAcceso.jsx'
import { CAPACIDADES, ESTADISTICAS, PASOS, PUBLICO } from '../data/contenido.js'

export default function Inicio() {
  return (
    <>
      <section className="hero" aria-labelledby="titulo-principal">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow"><span className="badge">100% en tu navegador · sin subir archivos</span></p>
            <h1 id="titulo-principal">Oculta datos personales <em>en segundos</em></h1>
            <p className="lead">Anonimizá contratos, expedientes y planillas: nombres, DNI, domicilios y cuentas bancarias se reemplazan antes de compartir el documento.</p>
            <div className="hero__actions">
              <Enlace a="anonimizar" className="btn btn--primary">Anonimizar un documento →</Enlace>
              <Enlace a="herramientas" className="btn btn--ghost">Ver herramientas</Enlace>
            </div>
            <p className="eyebrow eyebrow--tight">Diseñado para</p>
            <ul className="public">
              {PUBLICO.map((p) => <li key={p} className="badge badge--muted">{p}</li>)}
            </ul>
          </div>
          <figure className="hero__media">
            <img src="./img/hero-documento.svg" width="560" height="400"
              alt="Ejemplo de un contrato donde el nombre, el DNI, el domicilio, el correo y la cuenta bancaria fueron reemplazados por etiquetas ámbar como NOMBRE_1 y DNI_1." />
            <figcaption>EJEMPLO · contrato_alquiler.txt</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="titulo-numeros">
        <div className="container">
          <h2 id="titulo-numeros" className="visually-hidden">AnonimaX en números</h2>
          <ul className="stats">
            {ESTADISTICAS.map((e) => <li key={e.id}><strong>{e.numero}</strong><span>{e.texto}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section" id="que-detecta" aria-labelledby="titulo-detecta">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Capacidades del sistema</p>
            <h2 id="titulo-detecta">Detecta lo que importa <em>proteger</em></h2>
            <p className="lead">Combina expresiones regulares, validaciones (Luhn, formatos argentinos) y lectura de encabezados en CSV, JSON y XML. Ahora también lee Word y PDF.</p>
          </div>
          <ul className="grid">
            {CAPACIDADES.map((c) => (
              <li key={c.id}><Tarjeta titulo={c.titulo} texto={c.texto} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="titulo-flujo">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Flujo de trabajo</p>
            <h2 id="titulo-flujo">Del documento al documento seguro en 4 pasos</h2>
          </div>
          <ol className="steps">
            {PASOS.map((p) => <li key={p.id}><h3>{p.titulo}</h3><p>{p.texto}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="section" id="acceso" aria-labelledby="titulo-acceso">
        <div className="container cta">
          <p className="eyebrow">Novedades</p>
          <h2 id="titulo-acceso">Enterate cuando <em>sumemos más formatos</em></h2>
          <p className="lead">Dejanos tu correo y te avisamos. Es una demo académica: los datos no se envían a ningún servidor.</p>
          <FormularioAcceso />
          <p className="hint mt-2">Sin tarjeta de crédito · Sin registro · Datos procesados en tu equipo</p>
        </div>
      </section>
    </>
  )
}
