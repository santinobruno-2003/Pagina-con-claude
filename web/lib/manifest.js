/* =============================================================
   stackdigital — datos de marca
   Editá este archivo para cambiar textos, casos y contacto.
   ============================================================= */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "stackdigital",
    tagline: "Web, contenido y publicidad para profesionales",

    contact: {
      whatsapp: "5491132519490",
      whatsappLabel: "11 3251-9490",
      whatsappMsg: "Hola! Vi la web y quiero que veamos mi caso.",
      instagram: "stackdigital.arg",
      instagramUrl: "https://www.instagram.com/stackdigital.arg/"
    },

    // Caso con datos reales — Administrador de anuncios de Meta, 2 al 8 de octubre
    caso: {
      cliente: "Liza Lencería",
      periodo: "2 al 8 de octubre",
      fuente: "Administrador de anuncios de Meta",
      metricas: [
        { valor: 98,     sufijo: "",  label: "conversaciones iniciadas" },
        { valor: 11461,  sufijo: "",  label: "personas alcanzadas" },
        { valor: 393,    prefijo: "$", label: "por cada conversación" },
        { valor: 7,      sufijo: " días", label: "de campaña" }
      ]
    },

    proyectos: [
      {
        nombre: "Lumen",
        rubro: "Estudio dental",
        tipo: "Sitio web",
        anio: "2026",
        nota: "Odontología en Palermo. Web de una página con turnos por WhatsApp.",
        img: "assets/img/caso-lumen.webp",
        url: ""
      },
      {
        nombre: "Duck Argentina",
        rubro: "Indumentaria deportiva",
        tipo: "Sitio web",
        anio: "2026",
        nota: "Tienda con catálogo, clubes y carrito.",
        img: "assets/img/caso-duck.webp",
        url: "https://duckargentina.com/"
      },
      {
        nombre: "Espacio Sil Ragolia",
        rubro: "Nutrición, deporte y estética",
        tipo: "Sitio web",
        anio: "2026",
        nota: "Servicios y reserva de turnos online.",
        img: "assets/img/caso-silragolia.webp",
        url: "https://espaciosilragolia.com/"
      },
      {
        nombre: "Liza Lencería",
        rubro: "Lencería",
        tipo: "Meta Ads",
        anio: "2026",
        nota: "98 consultas por WhatsApp en 7 días con unos USD 5 por día.",
        img: "assets/img/caso-liza.webp",
        url: ""
      }
    ]
  };
})();
