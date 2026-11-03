# Etapa 1 · Planificar: árbol de componentes

## Árbol

```
App                         (estado: tema, ruta → decide la pantalla)
├── Header                  (estado: menuAbierto)
│   ├── Logo → Enlace
│   └── Enlace ×4  (Inicio, Herramientas, Anonimizar, Privacidad)
├── main
│   ├── Inicio
│   │   ├── Enlace (botones)
│   │   ├── Tarjeta ×6      ← reutilizable
│   │   └── FormularioAcceso
│   │       └── Campo ×4    ← reutilizable
│   ├── Herramientas        (estado: datos del fetch, cargando, error, consulta, categoría, favoritas)
│   │   ├── Estado (Cargando / ErrorCarga)
│   │   └── TarjetaHerramienta ×9
│   │       └── Tarjeta     ← reutilizable
│   ├── Anonimizar          (estado: formulario completo, errores, resultado)
│   │   ├── Opcion ×(2 + 10 + 3)   ← reutilizable
│   │   ├── Campo
│   │   └── Resultado
│   └── Privacidad
└── Footer
    ├── Logo
    └── Enlace ×4
```

## Componentes reutilizables (se escriben una sola vez)

| Componente | Props | Dónde se usa |
|---|---|---|
| `Tarjeta` | `titulo`, `texto`, `arriba`, `className`, `children` | Capacidades de la portada y herramientas |
| `Campo` | `id`, `etiqueta`, `error`, `ayuda`, `completo`, `children` | Formulario de la portada y «palabras adicionales» |
| `Opcion` | `tipo`, `nombre`, `valor`, `titulo`, `ayuda`, `marcado`, `onChange` | Origen, tipos de datos y modo de ocultado |
| `Enlace` | `a`, `tipo`, `actual`, `className` | Toda la navegación |

## Datos: ¿estado o props?

| Información | ¿Cambia? | Dónde vive | Cómo viaja |
|---|---|---|---|
| Tema claro/oscuro | Sí | `App` (hook `useTema`) | Props `tema` y `onAlternarTema` → `Header` |
| Pantalla actual | Sí | Dirección `#/…` (hook `useRuta`) | `App` elige qué pantalla mostrar; `pantalla` → `Header` |
| Menú móvil abierto | Sí | `Header` | No sale del componente |
| Lista de herramientas | Llega con `fetch` | `Herramientas` | Cada herramienta → `TarjetaHerramienta` (prop `herramienta`) |
| Búsqueda, categoría, favoritas | Sí | `Herramientas` | `esFavorita` y `onFavorito` → `TarjetaHerramienta` |
| Campos del formulario de contacto | Sí | `FormularioAcceso` | `value` y `onChange` en cada campo |
| Archivo, texto, tipos, modo, extras | Sí | `Anonimizar` | `marcado` y `onChange` → `Opcion` |
| Resultado del anonimizado | Sí | `Anonimizar` | Prop `datos` → `Resultado` |
| Capacidades, pasos, tipos de datos | No | `src/data/contenido.js` | Se importan y se recorren con `map()` |
