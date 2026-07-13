# Restaurant Ca Na Margalida — Rediseño web

Rediseño de la página web del restaurante **Ca Na Margalida** (Felanitx, Mallorca).
Diseño minimalista y moderno, muy visual, con animaciones y sin dependencias: HTML, CSS y JavaScript puros.

## Estructura

```
index.html      Página única con todas las secciones
css/styles.css  Estilos y animaciones
js/main.js      Interacciones (slideshow, reveal, parallax, lightbox, cursor, contadores)
img/            Fotos del restaurante
docs/carta.pdf  Carta original (fuente de los precios)
```

## Secciones

- **Hero** con pase de fotos (crossfade), título animado, parallax y grano de película
- **Nosotros** con contadores animados y revelado de imágenes en cortina
- **Carta** completa desde el PDF oficial (entrantes y principales con precios) + menú degustación (42 €) + descarga del PDF
- **Galería** con lightbox y efectos hover
- **Contacto** con dirección, horario y enlace de reservas (CoverManager)

Extras: barra de progreso de scroll, cursor personalizado en escritorio, marquee, respeta `prefers-reduced-motion`.

## Uso

Abrir `index.html` directamente, o servir en el puerto 3000:

```
npx serve -l 3000 .
```

Web disponible en http://localhost:3000

## Datos del restaurante

- Passeig de n'Ernest Mestre, 28 · 07200 Felanitx, Illes Balears
- +34 613 647 944
- Martes a domingo, 13:00–16:00 y 19:00–22:00 (lunes cerrado)
- Reservas: https://restaurante.covermanager.com/ca-na-margalida/
- Instagram: [@restaurantcanamargalida](https://www.instagram.com/restaurantcanamargalida/)
