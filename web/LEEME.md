# Web de stackdigital

Sitio estático: HTML, CSS y JavaScript sin dependencias. No hay que compilar
nada ni instalar nada. Se sube la carpeta entera por FTP y funciona.

## Subirla a Hostinger

1. Entrá al Administrador de archivos (o conectate por FTP).
2. Abrí la carpeta `public_html`.
3. Arrastrá adentro **todo el contenido de esta carpeta**, incluido el archivo
   `.htaccess` (empieza con punto: en algunos sistemas está oculto, hay que
   activar "mostrar archivos ocultos").
4. Listo. Entrá a tu dominio.

## Cada vez que cambies algo

En `index.html` hay tres referencias con `?v=20261012`. Cambiá esa fecha por la
del día en que subís el cambio. Si no lo hacés, Hostinger puede seguir
mostrando la versión vieja durante horas.

## Qué editar para cambiar textos

- **Textos, títulos y preguntas frecuentes** → `index.html`.
- **WhatsApp, Instagram y datos del caso** → `lib/manifest.js` (arriba de todo).
  El número de WhatsApp está también escrito directo en `index.html` para que
  el enlace funcione aunque el JavaScript falle: si lo cambiás, cambialo en
  los dos lados.
- **Colores** → `styles.css`, en el bloque `:root` del principio.

## Estructura

```
index.html        la página entera
styles.css        todos los estilos
main.js           animaciones y comportamiento
lib/              GSAP y los datos de marca
assets/img/       imágenes en WebP
assets/photos/    originales (no hace falta subirlos)
.htaccess         configuración de caché del servidor
```

## Pendiente

- Falta el dominio definitivo en las etiquetas `og:` de `index.html`.
- Faltan las capturas de Duck Argentina y Espacio Il Ragolia para que esos
  dos proyectos muestren vista previa al pasar el mouse, como hace Lumen.
