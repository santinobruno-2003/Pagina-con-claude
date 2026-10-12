# Web de stackdigital

Sitio estático: HTML, CSS y JavaScript sin dependencias. No hay que compilar
nada ni instalar nada. Se sube la carpeta entera por FTP y funciona.

## Subirla a Hostinger

1. Entrá a hPanel → **Sitios web** → tu dominio → **Administrador de archivos**.
2. Abrí la carpeta `public_html`.
3. Si adentro hay un `index.html` o un `default.php` que puso Hostinger,
   borralos. No borres `.well-known` si existe.
4. Botón **Subir archivos** y subí `web-stackdigital.zip` tal cual.
5. Click derecho sobre el zip → **Extraer** (Extract) → confirmá que la ruta
   sea `/public_html`.
6. Borrá el zip, que ya no hace falta.
7. Entrá a tu dominio. Debería verse.

El archivo `.htaccess` empieza con punto, así que el Administrador de archivos
puede no mostrarlo. Para verlo: ícono de **Configuración** (engranaje, arriba
a la derecha) → **Mostrar archivos ocultos**. Tiene que estar sí o sí en
`public_html`, es lo que evita que el navegador muestre versiones viejas.

## Certificado HTTPS

En hPanel → **Seguridad** → **SSL**, activalo para el dominio (es gratis y
tarda unos minutos). Cuando el candado ya funcione, abrí `.htaccess` y
descomentá el bloque que dice "HTTPS redirect": sacale el `#` a las cinco
líneas. Eso manda a todo el mundo a la versión segura.

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
