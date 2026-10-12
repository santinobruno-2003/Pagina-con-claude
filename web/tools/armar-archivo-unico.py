#!/usr/bin/env python3
"""Arma una version de la web en un solo archivo HTML.

Mete los estilos, los scripts y las imagenes dentro del propio index.html,
asi se puede subir un unico archivo a cualquier hosting o abrirlo con doble
clic. Perde el control de cache del .htaccess, por eso la version normal
(la carpeta entera) sigue siendo la recomendada.

Uso:  python3 tools/armar-archivo-unico.py
"""
import base64, os, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(os.path.dirname(RAIZ), "stackdigital-un-solo-archivo.html")
VERSION = "?v=20261012"

SCRIPTS = ["lib/gsap.min.js", "lib/ScrollTrigger.min.js", "lib/manifest.js", "main.js"]
BINARIOS = [
    ("assets/img/caso-lumen.webp", "image/webp"),
    ("assets/img/caso-duck.webp", "image/webp"),
    ("assets/img/caso-silragolia.webp", "image/webp"),
    ("assets/img/caso-liza.webp", "image/webp"),
    ("assets/img/isotipo.webp", "image/webp"),
    ("assets/img/icon-180.png", "image/png"),
    ("favicon.ico", "image/x-icon"),
]


def leer(rel):
    with open(os.path.join(RAIZ, rel), encoding="utf-8") as f:
        return f.read()


def datauri(rel, mime):
    with open(os.path.join(RAIZ, rel), "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


def main():
    html = leer("index.html")

    html = html.replace('<link rel="stylesheet" href="styles.css%s">' % VERSION,
                        "<style>\n%s\n</style>" % leer("styles.css"))

    for src in SCRIPTS:
        for tag in ('<script defer src="%s%s"></script>' % (src, VERSION),
                    '<script defer src="%s"></script>' % src):
            if tag in html:
                html = html.replace(tag, "<script>\n%s\n</script>" % leer(src))
                break
        else:
            sys.exit("No encontre la etiqueta de " + src)

    for rel, mime in BINARIOS:
        html = html.replace(rel, datauri(rel, mime))

    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(html)
    print("Escrito %s (%.0f KB)" % (SALIDA, os.path.getsize(SALIDA) / 1024))


if __name__ == "__main__":
    main()
