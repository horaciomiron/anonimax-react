# Para estudiar: cómo funciona cada parte

Guía para poder explicar el código si el profesor lo pide.

## 1. Cómo arranca
`index.html` tiene un `<div id="root">`. `src/main.jsx` le dice a React: «dibujá `<App />` ahí adentro». Todo lo demás son componentes que `App` usa.

## 2. Componentes y JSX
Un componente es una función que devuelve JSX (HTML dentro de JavaScript). Diferencias con HTML: `className` en vez de `class`, `htmlFor` en vez de `for`, y lo que va entre `{ }` es JavaScript. Mantuvimos las etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`), los títulos en orden y los textos alternativos de la 3.1.

## 3. Props
Son los datos que un componente recibe de su padre, como los argumentos de una función. `<Tarjeta titulo="DNI, CUIT y CUIL" texto="…" />` usa el mismo componente con datos distintos. Las props **no se modifican** dentro del componente que las recibe.

## 4. Estado con `useState`
`const [tema, setTema] = useState('dark')` guarda un valor que cambia. Al llamar `setTema(...)`, React vuelve a dibujar el componente solo. En la 3.1 se cambiaba el DOM a mano (`querySelector`, `textContent`); acá solo se cambia el estado y la pantalla se actualiza.

- **Lista con `map()` y `key`:** `herramientas.map((h) => <li key={h.id}>…</li>)`. La `key` única (el `id`) permite a React saber qué elemento es cuál.
- **Formulario controlado:** cada campo tiene `value={estado}` y `onChange` que actualiza ese estado. El estado es la «fuente de verdad».
- **Renderizado condicional:** `{cargando && <Cargando />}` o `pantalla === 'inicio' && <Inicio />` muestran algo solo si se cumple la condición.
- **Navegación:** el hook `useRuta` lee `#/herramientas` de la dirección; `App` muestra la pantalla que corresponde.

## 5. Datos externos con `useEffect`
`useEffect(() => { fetch(...) }, [intento])` corre **después** de dibujar la pantalla. Tiene tres estados: `cargando` (se muestra «Cargando…»), datos (se muestra la lista) y `error` (mensaje con botón Reintentar). La función que devuelve el efecto (`control.abort()`) cancela el pedido si el usuario cambia de pantalla.

## 6. El motor de anonimización
`src/lib/` es JavaScript puro, sin React: recibe texto y devuelve texto. `anonymizer.js` detecta datos con expresiones regulares; `docx-handler.js` lee el Word (un ZIP con XML); `pdf-handler.js` dibuja la página en un canvas, tapa los datos y arma un PDF nuevo hecho de imágenes (así el texto tapado no se puede recuperar). `Anonimizar.jsx` solo conecta la pantalla con ese motor.

## 7. Por qué no hay librerías de componentes
La consigna prohíbe Material UI, Bootstrap, Tailwind y componentes de clase. Todo es CSS propio (migrado de la 3.1) y componentes funcionales con hooks. JSZip, pdf.js y pdf-lib solo leen y escriben archivos Word y PDF; se cargan únicamente cuando se sube uno.

## Preguntas que podría hacer el profesor
- ¿Qué diferencia hay entre estado y props?
- ¿Por qué hace falta la `key` en una lista?
- ¿Qué pasa si `useEffect` no tiene el arreglo de dependencias?
- ¿Cómo sabe React que tiene que volver a dibujar?
- ¿Qué cambió respecto de la 3.1 en el modo claro/oscuro?
