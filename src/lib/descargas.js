// Utilidades de archivos: descargar y leer extensiones.
export const extensionDe = (nombre) => (nombre.includes('.') ? nombre.split('.').pop().toLowerCase() : '')

export function descargar(contenido, nombreArchivo, tipo) {
  const blob = contenido instanceof Blob ? contenido : new Blob([contenido], { type: `${tipo};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo
  enlace.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// Las librerías pesadas (JSZip, pdf.js, pdf-lib) se cargan solo cuando hacen falta.
const cargados = new Map()
export function cargarScript(ruta) {
  if (!cargados.has(ruta)) {
    cargados.set(ruta, new Promise((ok, mal) => {
      const s = document.createElement('script')
      s.src = ruta
      s.onload = ok
      s.onerror = () => { cargados.delete(ruta); mal(new Error(`No se pudo cargar ${ruta}`)) }
      document.head.append(s)
    }))
  }
  return cargados.get(ruta)
}
