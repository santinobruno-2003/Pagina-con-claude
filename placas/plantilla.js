// Placas para campaña de Meta, calcadas del feed de @stackdigital.arg.
// Colores muestreados de una captura del perfil.
const ANCHO = 1080;
const ALTO  = { carrusel: 1080, historia: 1920 };

// Stories: Meta tapa arriba con el perfil y abajo con el botón de acción.
const SEGURA = { arriba: 250, abajo: 340 };

const C = {
  fondo:    '#0C1321',   // azul casi negro
  degrade:  '#0B2C5A',   // el halo azul del fondo
  circulo:  '#0B294E',
  violeta:  '#211A41',
  azul:     '#0574FF',   // el acento: cifras y el "digital" del logo
  azulSuave:'#73ACFF',   // la parte resaltada de los títulos
  blanco:   '#FFFFFF',
  texto:    '#C5C5E0',
  tenue:    '#6A698C',
};

function estilos(formato){
  const alto = ALTO[formato];
  const padTop    = formato === 'historia' ? SEGURA.arriba + 40 : 72;
  const padBottom = formato === 'historia' ? SEGURA.abajo  + 30 : 72;
  const g = formato === 'historia' ? 1.1 : 1;
  return `
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${ANCHO}px;height:${alto}px;overflow:hidden;}
  .placa{width:${ANCHO}px;height:${alto}px;background:${C.fondo};
    padding:${padTop}px 72px ${padBottom}px;display:flex;flex-direction:column;
    font-family:'Poppins',sans-serif;color:${C.blanco};position:relative;overflow:hidden;}
  /* el halo y los dos círculos que salen del borde */
  .fondo{position:absolute;inset:0;
    background:radial-gradient(900px 760px at 78% 16%, ${C.degrade} 0%, rgba(11,44,90,0) 62%);}
  .circ{position:absolute;border-radius:50%;}
  .circ-azul{width:${540*g}px;height:${540*g}px;top:${-150*g}px;right:${-130*g}px;background:${C.circulo};}
  .circ-violeta{width:${(formato==='historia'?330:420)*g}px;height:${(formato==='historia'?330:420)*g}px;
    bottom:${(formato==='historia'?-210:-170)*g}px;left:${-170*g}px;background:${C.violeta};}
  .capa{position:relative;z-index:1;display:flex;flex-direction:column;height:100%;}
  .logo{font-size:${30*g}px;font-weight:700;letter-spacing:-.01em;}
  .logo i{font-style:normal;color:${C.azul};}
  /* en 1:1 se apoya abajo como el feed; en 9:16 se centra en la zona segura */
  .cuerpo{margin-top:auto;${formato === 'historia' ? 'margin-bottom:auto;' : ''}}
  .volanta{font-size:${19*g}px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;
    color:${C.azulSuave};margin-bottom:${22*g}px;}
  h1{font-weight:700;line-height:.99;letter-spacing:-.025em;}
  h1 .az{color:${C.azulSuave};}
  .portada h1{font-size:${76*g}px;}
  .punto h1{font-size:${76*g}px;}
  .cierre h1{font-size:${76*g}px;}
  .dato h1{font-size:${58*g}px;line-height:1.05;}
  .cifra{font-size:${210*g}px;font-weight:700;color:${C.azul};line-height:.86;
    letter-spacing:-.045em;margin-bottom:${10*g}px;}
  .texto{font-size:${30*g}px;line-height:1.5;color:${C.texto};margin-top:${26*g}px;max-width:95%;}
  .texto b{color:${C.blanco};font-weight:600;}
  .cta{background:${C.azul};color:${C.blanco};border-radius:${14*g}px;
    padding:${22*g}px ${44*g}px;font-size:${28*g}px;font-weight:700;
    display:inline-block;margin-top:${34*g}px;}
  .pie{display:flex;justify-content:space-between;margin-top:${44*g}px;
    font-size:${20*g}px;color:${C.tenue};letter-spacing:.06em;}`;
}

function titulo(p){
  return `<h1>${p.fuerte}${p.azul ? `<span class="az">${p.azul}</span>` : ''}</h1>`;
}

function cuerpo(p, datos){
  const cabeza = p.volanta ? `<p class="volanta">${p.volanta}</p>` : '';
  if (p.tipo === 'dato') return `
      ${cabeza}
      <p class="cifra">${p.cifra}</p>
      ${titulo(p)}
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
  if (p.tipo === 'cierre') return `
      ${cabeza}
      ${titulo(p)}
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}
      <div class="cta">${datos.cta}</div>`;
  return `
      ${cabeza}
      ${titulo(p)}
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
}

function html(p, datos, formato, i, total){
  const num = `${String(i+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
  return `<!doctype html><meta charset="utf-8"><style>${estilos(formato)}</style>
<div class="placa">
  <div class="fondo"></div>
  <div class="circ circ-azul"></div>
  <div class="circ circ-violeta"></div>
  <div class="capa">
    <div class="logo">stack<i>digital</i></div>
    <div class="cuerpo ${p.tipo}">${cuerpo(p, datos)}</div>
    <div class="pie"><span>${datos.contacto}</span><span>${num}</span></div>
  </div>
</div>`;
}
module.exports = { html, ANCHO, ALTO, SEGURA, C };
