import Enlace from '../components/Enlace.jsx'

export default function Privacidad() {
  return (
    <>
      <section className="container page-head" aria-labelledby="titulo-priv">
        <p className="eyebrow">Privacidad</p>
        <h1 id="titulo-priv">Tus documentos <em>no salen de tu equipo</em></h1>
      </section>

      <article className="container prose pb-5">
        <h2>Qué hace AnonimaX con tus archivos</h2>
        <p>Todo el procesamiento ocurre en tu navegador con JavaScript. Los archivos <strong>no se suben</strong> a ningún servidor, no se guardan y no se envían a terceros. Al cerrar o recargar la página, el contenido desaparece.</p>
        <ul>
          <li>No usamos cookies de seguimiento ni herramientas de analítica.</li>
          <li>El único dato que guardamos en tu navegador es la preferencia de tema (claro u oscuro).</li>
          <li>El formulario de la portada es una demostración: no envía nada.</li>
        </ul>

        <h2>Límites de la detección automática</h2>
        <p>AnonimaX usa reglas y expresiones regulares, no inteligencia artificial. Por eso:</p>
        <ul>
          <li>Puede <strong>no detectar</strong> un nombre sin título, etiqueta ni nombre de pila conocido, o un número de documento sin formato ni etiqueta.</li>
          <li>Puede <strong>ocultar de más</strong> una palabra que se parece a un dato personal.</li>
          <li>Lee Word y PDF con texto, pero <strong>no el texto dentro de imágenes</strong> (no hay OCR): un PDF escaneado se rechaza y las imágenes de un Word o PDF hay que revisarlas a mano.</li>
          <li>El PDF resultante es una imagen de cada página: los datos tapados no se pueden recuperar, pero el texto ya no se puede seleccionar.</li>
        </ul>
        <p><strong>Revisá siempre el resultado antes de compartirlo.</strong> La anonimización es una ayuda, no una garantía legal.</p>

        <h2>Marco legal de referencia</h2>
        <p>En Argentina los datos personales están protegidos por la Ley 25.326. Esta herramienta es un proyecto académico y no reemplaza el asesoramiento profesional.</p>

        <p className="mt-4"><Enlace a="anonimizar" className="btn btn--primary">Probar el anonimizador →</Enlace></p>
      </article>
    </>
  )
}
