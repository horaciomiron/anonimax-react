# AnonimaX (React) — Anonimizador de documentos

Aplicación web que oculta datos personales (nombres, DNI, CUIT/CUIL, domicilios, cuentas bancarias, tarjetas, correos, teléfonos, patentes y fechas) en documentos **Word, PDF, TXT, CSV, JSON, XML, HTML y Markdown**. Todo se procesa en el navegador: ningún archivo se sube a un servidor.

Es la evolución de un proyecto en tres etapas: diseño (Ejercitación 1.1) → sitio con HTML, CSS y JavaScript (3.1) → **aplicación en React (4.1)**.

## Integrantes

- Horacio Miron — Joshua Narvaes - Valentín Ortega

## Enlaces

- Sitio publicado: https://anonimax-react.vercel.app/
- Repositorio: https://github.com/horaciomiron/anonimax-react
- Prototipo de Figma: https://www.figma.com/make/Wgc7l3TwJf04ijG8DCSI1z/AI-Legal-Document-Analyzer?t=T0AWejI6W2Yxdhb5-1
- Versión 3.1 (HTML/CSS/JS): https://github.com/horaciomiron/anonimax · https://horaciomiron.github.io/anonimax/

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org) (versión LTS).

```bash
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # servidor de desarrollo: http://localhost:5173
npm run build      # genera la versión de producción en dist/
npm run preview    # prueba la versión de producción
```

## Qué usa de React (Ejercitación 4.1)

| Etapa | Dónde está |
|---|---|
| 1. Planificar | `docs/ARBOL-DE-COMPONENTES.md` |
| 2. Componentizar | `src/components/` (11 componentes) y `src/pages/` (4 pantallas), todos funcionales, con JSX y props |
| 3. Dar estado | `useState`: lista con `map()` y `key` (Herramientas), formularios controlados con validación (portada y anonimizador), navegación entre pantallas, búsqueda y filtro, favoritas con contador, menú mobile y modo claro/oscuro |
| 4. Conectar | `src/pages/Herramientas.jsx`: `useEffect` + `fetch` de `public/data/herramientas.json`, con estados «Cargando…» y de error con botón «Reintentar» |
| 5. Verificar y publicar | `npm run build` sin errores; consola limpia; ver la sección siguiente |

## Estructura

```
anonimax-react/
├── public/
│   ├── data/herramientas.json   (datos externos que se cargan con fetch)
│   ├── vendor/                  (JSZip, pdf.js y pdf-lib: solo se cargan al subir Word o PDF)
│   ├── muestras/                (archivos de prueba)
│   └── img/
├── src/
│   ├── components/   Header, Footer, Logo, Enlace, Tarjeta, TarjetaHerramienta, Campo, Opcion,
│   │                 FormularioAcceso, Resultado, Estado
│   ├── pages/        Inicio, Herramientas, Anonimizar, Privacidad
│   ├── hooks/        useTema, useRuta
│   ├── data/         contenido.js (listas de datos fijos)
│   ├── lib/          anonymizer.js (motor), docx-handler.js, pdf-handler.js, procesar.js, descargas.js
│   ├── styles/       styles.css (CSS de la 3.1: variables de color y tipografía)
│   ├── App.jsx
│   └── main.jsx
└── docs/
```

## Verificación

| Pantalla | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Inicio | _completar_ | _completar_ | _completar_ | _completar_ |
| Herramientas | _completar_ | _completar_ | _completar_ | _completar_ |
| Anonimizar | _completar_ | _completar_ | _completar_ | _completar_ |

_Lighthouse en Chrome → DevTools → Lighthouse. Medí vos y anotá tus valores._

## Limitaciones

- La detección usa reglas, no IA: puede omitir o ocultar de más. **Revisar siempre el resultado.**
- No hay OCR: un PDF escaneado se rechaza y el texto dentro de imágenes no se anonimiza.
- El PDF resultante es una imagen por página (seguro, pero no seleccionable).
