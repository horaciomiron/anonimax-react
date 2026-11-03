# Presentación «Del sitio a la aplicación» (7 diapositivas)

1. **Portada:** AnonimaX · logo (`public/img/logo.svg`) · integrantes.
2. **La evolución:** 1.1 diseño en Figma → 3.1 sitio en HTML/CSS/JS (con Word y PDF en la v2) → 4.1 aplicación en React.
3. **Árbol de componentes:** pegar el árbol de `docs/ARBOL-DE-COMPONENTES.md` (como diagrama) y marcar `Tarjeta`, `Campo`, `Opcion` y `Enlace` como reutilizables.
4. **Estado y props:** tabla de «Datos: ¿estado o props?» del mismo archivo.
5. **Datos externos:** `public/data/herramientas.json` + `useEffect`/`fetch`. Capturas de «Cargando…» y del error (en el navegador: F12 → Network → «Offline», entrar a Herramientas).
6. **Antes y después:** 3.1: se manipulaba el DOM con `querySelector`; 4.1: el estado cambia y la pantalla se actualiza. Se reutilizó el CSS y el motor de anonimización completo. Mejoró: componentes reutilizables, favoritas, un solo lugar para cada dato.
7. **Enlaces:** repositorio, sitio publicado y prototipo de Figma.
