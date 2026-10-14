// Placas para campaña de Meta, con la marca: navy #022249, Open Sauce Sans.
// Título en dos partes: la primera en 700, la segunda en 300 itálica.
const ANCHO = 1080;
const ALTO  = { carrusel: 1080, historia: 1920 };

// Stories: Meta tapa arriba con el perfil y abajo con el botón de acción.
const SEGURA = { arriba: 250, abajo: 340 };

const C = {
  navy:    '#022249',
  negro:   '#111111',
  blanco:  '#FFFFFF',
  gris:    '#5F636A',   // texto secundario sobre claro
  linea:   '#D6DDE8',
  suave:   '#B0C2D9',   // texto suave sobre navy
  tarjeta: '#EEF2F7',
};

// Open Sauce no trae la flecha →, se dibuja.
const FLECHA = (color, alto = 20) => `<svg class="flecha" width="${alto*1.7}" height="${alto}"
  viewBox="0 0 34 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 10 H31" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M23 2.5 L31 10 L23 17.5" stroke="${color}" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function estilos(formato, fondo){
  const alto = ALTO[formato];
  const oscuro = fondo === 'navy';
  const padTop    = formato === 'historia' ? SEGURA.arriba + 60 : 80;
  const padBottom = formato === 'historia' ? SEGURA.abajo  + 40 : 80;
  const g = formato === 'historia' ? 1.12 : 1;
  const tinta    = oscuro ? C.blanco : C.negro;
  const segundo  = oscuro ? C.suave  : C.navy;
  const cuerpoTx = oscuro ? C.suave  : C.gris;
  const borde    = oscuro ? 'rgba(255,255,255,.22)' : C.linea;
  return `
  @font-face{font-family:'OS';src:url('OpenSauce-Light.ttf') format('truetype');font-weight:300;font-style:normal;}
  @font-face{font-family:'OS';src:url('OpenSauce-LightItalic.ttf') format('truetype');font-weight:300;font-style:italic;}
  @font-face{font-family:'OS';src:url('OpenSauce-Regular.ttf') format('truetype');font-weight:400;font-style:normal;}
  @font-face{font-family:'OS';src:url('OpenSauce-Bold.ttf') format('truetype');font-weight:700;font-style:normal;}
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${ANCHO}px;height:${alto}px;overflow:hidden;}
  .placa{width:${ANCHO}px;height:${alto}px;background:${oscuro?C.navy:C.blanco};
    padding:${padTop}px 80px ${padBottom}px;display:flex;flex-direction:column;
    font-family:'OS',sans-serif;color:${tinta};position:relative;overflow:hidden;}
  /* encabezado del sistema: marca a la izquierda, numeración a la derecha */
  .encab{display:flex;justify-content:space-between;font-size:${19*g}px;font-weight:400;
    letter-spacing:.18em;text-transform:uppercase;color:${oscuro?C.suave:C.gris};
    padding-bottom:${22*g}px;border-bottom:1px solid ${borde};}
  .cuerpo{flex:1;display:flex;flex-direction:column;justify-content:center;}
  .volanta{font-size:${22*g}px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
    color:${segundo};margin-bottom:${26*g}px;}
  h1{font-weight:700;line-height:1.1;letter-spacing:-.015em;}
  h1 .suave{display:block;font-weight:300;font-style:italic;color:${segundo};}
  .portada h1{font-size:${84*g}px;}
  .punto h1, .dato h1{font-size:${62*g}px;}
  .cierre h1{font-size:${88*g}px;}
  .texto,.bajada{font-size:${34*g}px;line-height:1.55;color:${cuerpoTx};margin-top:${28*g}px;max-width:94%;}
  .num{font-size:${86*g}px;font-weight:700;color:${segundo};line-height:1;margin-bottom:${20*g}px;}
  .cifra{font-size:${300*g}px;font-weight:700;color:${oscuro?C.blanco:C.navy};
    line-height:.82;letter-spacing:-.05em;margin-bottom:${14*g}px;}
  .dato .texto{border-top:1px solid ${borde};padding-top:${26*g}px;margin-top:${34*g}px;}
  .desliza{display:flex;align-items:center;gap:${14*g}px;margin-top:${34*g}px;
    font-size:${28*g}px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${segundo};}
  .cta{background:${oscuro?C.blanco:C.navy};color:${oscuro?C.navy:C.blanco};
    border-radius:999px;padding:${24*g}px ${50*g}px;font-size:${30*g}px;font-weight:700;
    align-self:flex-start;margin-top:${40*g}px;}
  .marco{border:1px solid ${borde};padding:${56*g}px ${48*g}px;
    display:flex;flex-direction:column;align-items:flex-start;}
  .pie{display:flex;justify-content:space-between;align-items:flex-end;
    padding-top:${24*g}px;border-top:1px solid ${borde};
    font-size:${24*g}px;color:${oscuro?C.suave:C.gris};}
  .pie b{font-weight:700;color:${tinta};}`;
}

function titulo(p){
  return `<h1>${p.fuerte}<span class="suave">${p.suave}</span></h1>`;
}

function cuerpo(p, datos, formato){
  const oscuro = p.fondo === 'navy';
  const acento = oscuro ? C.suave : C.navy;
  switch(p.tipo){
    case 'portada': return `
      ${p.volanta ? `<p class="volanta">${p.volanta}</p>` : ''}
      ${titulo(p)}
      ${p.bajada ? `<p class="bajada">${p.bajada}</p>` : ''}
      ${p.desliza ? `<div class="desliza">${p.desliza} ${FLECHA(acento, 20)}</div>` : ''}`;
    case 'punto': return `
      <p class="num">${p.n}</p>
      ${titulo(p)}
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
    case 'dato': return `
      <p class="cifra">${p.cifra}</p>
      ${titulo(p)}
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
    default: return `
      <div class="marco">
        ${titulo(p)}
        ${p.bajada ? `<p class="bajada">${p.bajada}</p>` : ''}
        <div class="cta">${datos.cta}</div>
      </div>`;
  }
}

function html(p, datos, formato, i, total){
  const clase = p.tipo;
  const num = `${String(i+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
  return `<!doctype html><meta charset="utf-8"><style>${estilos(formato, p.fondo)}</style>
<div class="placa">
  <div class="encab"><span>${datos.encabezado}</span><span>${num}</span></div>
  <div class="cuerpo ${clase}">${cuerpo(p, datos, formato)}</div>
  <div class="pie"><b>${datos.marca}</b><span>${datos.contacto}</span></div>
</div>`;
}
module.exports = { html, ANCHO, ALTO, SEGURA, C };
