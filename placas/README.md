# Placas para campaña de Meta

Adaptación del reel "más pacientes sin depender del boca en boca" a carrusel
y a historia, para sumar formatos al mismo conjunto de anuncios.

- `contenido.json` — los textos. Es lo único que se toca para cambiar el copy.
- `plantilla.js` — el diseño de cada tipo de placa (portada, punto, dato, cierre).
- `generar.js` — arma los PNG: `node generar.js`
- `salida/carrusel/` — 6 placas de 1080x1080
- `salida/historia/` — 3 placas de 1080x1920

Las historias respetan la zona segura de Meta: 250 px arriba (el perfil) y
340 px abajo (el botón de acción) quedan sin texto.
