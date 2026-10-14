# Placas para campaña de Meta

Adaptación del reel "más pacientes sin depender del boca en boca" a carrusel
y a historia, para sumar formatos al mismo conjunto de anuncios.

- `contenido.json` — los textos. Es lo único que se toca para cambiar el copy.
- `plantilla.js` — el diseño de cada tipo de placa (portada, punto, dato, cierre).
- `generar.js` — arma los PNG: `node generar.js`
- `salida/carrusel/` — 6 placas de 1080x1080
- `salida/historia/` — 3 placas de 1080x1920

## Marca

Navy #022249, blanco y negro #111111. Grises de apoyo: #5F636A para texto
secundario, #D6DDE8 para líneas, #B0C2D9 para texto suave sobre azul.
Tipografía Open Sauce Sans, convertida de .woff a .ttf con fontTools.

Los títulos van en dos partes: la primera en 700 y la segunda en 300 itálica
en azul (o #B0C2D9 cuando el fondo es azul). Cada placa lleva el encabezado
del sistema arriba: la marca a la izquierda y la numeración a la derecha.

Open Sauce no trae el glifo de la flecha →, así que se dibuja con un SVG.

## Zona segura de Stories

Las historias dejan libres 250 px arriba, donde Meta pone el perfil, y 340 px
abajo, donde pone el botón de acción.
