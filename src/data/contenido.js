// Datos que no cambian: se muestran con map() en las pantallas.
export const CAPACIDADES = [
  { id: 'nombres', titulo: 'Nombres y apellidos', texto: 'Detecta nombres con título (Dr., Sra.), con etiqueta («Titular:»), en formato «APELLIDO, Nombre» y nombres de pila frecuentes.' },
  { id: 'dni', titulo: 'DNI, CUIT y CUIL', texto: 'Reconoce 12.345.678, «DNI 12345678» y 20-12345678-9, y distingue un DNI de un importe en pesos.' },
  { id: 'domicilios', titulo: 'Domicilios', texto: 'Encuentra calles, avenidas y pasajes con su numeración, piso y departamento, y frases como «domicilio real en…».' },
  { id: 'cuentas', titulo: 'Cuentas y tarjetas', texto: 'CBU y CVU de 22 dígitos, alias, IBAN y tarjetas validadas con el algoritmo de Luhn.' },
  { id: 'contacto', titulo: 'Contacto', texto: 'Correos electrónicos y teléfonos argentinos: +54 9, código de área, «15» y números con etiqueta.' },
  { id: 'otros', titulo: 'Otros datos', texto: 'Patentes (ABC123 y AB123CD), fechas y las palabras personalizadas que agregues vos.' },
]

export const PASOS = [
  { id: 'subir', titulo: 'Sube o pega', texto: 'Elegí un archivo Word, PDF, TXT, CSV, JSON, XML, HTML o Markdown, o pegá el texto directamente.' },
  { id: 'elegir', titulo: 'Elegí qué ocultar', texto: 'Marcá los tipos de datos y, si querés, sumá palabras propias como nombres de empresas.' },
  { id: 'anonimizar', titulo: 'Anonimizá', texto: 'El motor detecta cada dato y lo reemplaza. El mismo dato siempre recibe la misma etiqueta.' },
  { id: 'revisar', titulo: 'Revisá y descargá', texto: 'Compará el original con el resultado, copiá el texto o bajá el archivo anonimizado.' },
]

export const PUBLICO = ['Abogados', 'Contadores', 'Recursos Humanos', 'Investigadores']

export const ESTADISTICAS = [
  { id: 'subidos', numero: '0', texto: 'archivos subidos a un servidor: todo se procesa en tu equipo' },
  { id: 'tipos', numero: '10', texto: 'tipos de datos personales que detecta' },
  { id: 'modos', numero: '3', texto: 'modos para ocultarlos: etiquetas, bloques o enmascarado' },
]

export const TIPOS_DATOS = [
  { valor: 'nombre', titulo: 'Nombres y apellidos', ayuda: 'Con título, etiqueta o nombre de pila conocido', activo: true },
  { valor: 'dni', titulo: 'DNI / documento', ayuda: '12.345.678 · DNI 12345678', activo: true },
  { valor: 'cuit', titulo: 'CUIT / CUIL', ayuda: '20-12345678-9', activo: true },
  { valor: 'email', titulo: 'Correos electrónicos', ayuda: 'nombre@dominio.com', activo: true },
  { valor: 'telefono', titulo: 'Teléfonos', ayuda: '+54 9 11 5555-1234 · 4555-1234', activo: true },
  { valor: 'domicilio', titulo: 'Domicilios', ayuda: 'Av. Colón 1234, piso 5', activo: true },
  { valor: 'cuenta', titulo: 'Cuentas bancarias', ayuda: 'CBU, CVU, IBAN, alias', activo: true },
  { valor: 'tarjeta', titulo: 'Tarjetas', ayuda: 'Validadas con algoritmo de Luhn', activo: true },
  { valor: 'patente', titulo: 'Patentes', ayuda: 'ABC123 · AB123CD', activo: true },
  { valor: 'fecha', titulo: 'Fechas', ayuda: '04/07/1985 · 15 de marzo de 2026', activo: false },
]

export const MODOS = [
  { valor: 'etiquetas', titulo: 'Etiquetas', ayuda: '[NOMBRE_1], [DNI_1]… el mismo dato = la misma etiqueta' },
  { valor: 'bloques', titulo: 'Bloques negros', ayuda: '████████ (no revela ni el largo)' },
  { valor: 'enmascarar', titulo: 'Enmascarar', ayuda: '**** **** **** 1111 (deja los últimos 4)' },
]

export const PERFILES = ['Abogado/a', 'Contador/a', 'Recursos Humanos', 'Investigador/a', 'Estudiante', 'Otro']

// Pantallas de la aplicación: la clave es lo que va después del # en la dirección
export const PANTALLAS = [
  { id: 'inicio', titulo: 'Inicio' },
  { id: 'herramientas', titulo: 'Herramientas' },
  { id: 'anonimizar', titulo: 'Anonimizar' },
  { id: 'privacidad', titulo: 'Privacidad' },
]
