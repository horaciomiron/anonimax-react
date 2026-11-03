// Une la pantalla con los motores. No toca el DOM: recibe datos y devuelve datos.
import Anonimax from './anonymizer.js'
import { cargarScript, extensionDe } from './descargas.js'

export const MAX_BYTES = 15 * 1024 * 1024
export const EXTENSIONES = ['docx', 'pdf', 'txt', 'csv', 'tsv', 'json', 'xml', 'html', 'htm', 'md', 'log']
export const FORMATO_POR_EXT = { csv: 'csv', tsv: 'csv', json: 'json', xml: 'xml' }
export const TIPO_MIME = {
  json: 'application/json', xml: 'application/xml', csv: 'text/csv',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', pdf: 'application/pdf',
}

const base = import.meta.env.BASE_URL

export const textoAnonimizado = (partes) =>
  partes.map((p) => (p.etiqueta ? `— ${p.etiqueta} —\n` : '') + p.resultado).join('\n')

export class PdfEscaneado extends Error {}

export async function procesar({ origen, archivo, texto, formato, opciones }, avisarEstado) {
  if (origen === 'texto') {
    const r = Anonimax.anonimizar(texto, { ...opciones, formato })
    return {
      partes: [{ texto, resultado: r.resultado, hallazgos: r.hallazgos }],
      resumen: r.resumen, avisos: [],
      salida: { texto: r.resultado, nombre: 'texto', extension: formato === 'texto' ? 'txt' : formato },
    }
  }

  const extension = extensionDe(archivo.name)
  const nombre = archivo.name.replace(/\.[^.]+$/, '')

  if (extension === 'docx' || extension === 'pdf') {
    avisarEstado('Cargando herramientas…')
    const buffer = await archivo.arrayBuffer()
    let r
    if (extension === 'docx') {
      await cargarScript(`${base}vendor/jszip.min.js`)
      const { default: DocxAnonimizador } = await import('./docx-handler.js')
      r = await DocxAnonimizador.procesar(buffer, opciones)
    } else {
      await Promise.all([cargarScript(`${base}vendor/pdf.min.js`), cargarScript(`${base}vendor/pdf-lib.min.js`)])
      const { default: PdfAnonimizador } = await import('./pdf-handler.js')
      PdfAnonimizador.configurar({ workerSrc: `${base}vendor/pdf.worker.min.js` })
      r = await PdfAnonimizador.procesar(buffer, opciones, (n, total) => avisarEstado(`Procesando página ${n} de ${total}…`))
      if (r.escaneado) throw new PdfEscaneado('PDF escaneado')
    }
    const partes = r.paginas || r.parrafos
    return {
      partes, resumen: r.estado.resumen, avisos: r.avisos,
      salida: { blob: r.blob, nombre, extension, textoPlano: textoAnonimizado(partes) },
    }
  }

  const contenido = await archivo.text()
  const r = Anonimax.anonimizar(contenido, { ...opciones, formato: FORMATO_POR_EXT[extension] || 'texto' })
  return {
    partes: [{ texto: contenido, resultado: r.resultado, hallazgos: r.hallazgos }],
    resumen: r.resumen, avisos: [],
    salida: { texto: r.resultado, nombre, extension },
  }
}
