# Placas para campaña de Meta

Adaptación del reel "más pacientes sin depender del boca en boca" a carrusel
y a historia, para sumar formatos al mismo conjunto de anuncios.

- `contenido.json` — los textos. Es lo único que se toca para cambiar el copy.
- `plantilla.js` — el diseño de cada tipo de placa.
- `generar.js` — arma los PNG: `node generar.js`
- `salida/carrusel/` — 6 placas de 1080x1080
- `salida/historia/` — 3 placas de 1080x1920

## Marca

Calcada del feed de @stackdigital.arg. Los colores salieron de muestrear una
captura del perfil, no de estimarlos a ojo:

| | |
|---|---|
| Fondo | `#0C1321` |
| Halo del fondo | `#0B2C5A` |
| Círculo azul | `#0B294E` |
| Círculo violeta | `#211A41` |
| Acento (cifras, el "digital" del logo) | `#0574FF` |
| Resaltado de títulos | `#73ACFF` |
| Texto secundario | `#C5C5E0` |
| Pie | `#6A698C` |

Tipografía Poppins. Los títulos van en 700 con el interlineado cerrado y la
última parte en celeste. Cada placa lleva el logo arriba a la izquierda, el
contenido apoyado abajo y el pie con el usuario y la numeración.

## Zona segura de Stories

Las historias dejan libres 250 px arriba, donde Meta pone el perfil, y 340 px
abajo, donde pone el botón de acción. En ese formato el contenido se centra
dentro de la franja visible en vez de apoyarse abajo.
