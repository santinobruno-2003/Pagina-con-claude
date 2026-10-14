// Placas para campaña de Meta. formato: 'carrusel' (1080x1080) | 'historia' (1080x1920)
const ANCHO = 1080;
const ALTO  = { carrusel: 1080, historia: 1920 };

// Stories: Meta tapa la franja de arriba con el perfil y la de abajo con el
// botón de acción. Nada importante entra ahí.
const SEGURA = { arriba: 250, abajo: 340 };

function estilos(formato){
  const alto = ALTO[formato];
  const padTop    = formato === 'historia' ? SEGURA.arriba + 70 : 92;
  const padBottom = formato === 'historia' ? SEGURA.abajo  + 50 : 92;
  const g = formato === 'historia' ? 1.12 : 1;   // la historia se lee de más lejos
  return `
  @font-face{font-family:'EBG';src:url('EBGaramond_1.ttf') format('truetype');font-weight:400;}
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:${ANCHO}px;height:${alto}px;overflow:hidden;}
  .placa{
    width:${ANCHO}px;height:${alto}px;background:#17140F;position:relative;overflow:hidden;
    padding:${padTop}px 88px ${padBottom}px;display:flex;flex-direction:column;
    font-family:'Poppins',sans-serif;color:#FFFFFF;
  }
  .halo{position:absolute;border-radius:50%;pointer-events:none;}
  .halo-1{width:1500px;height:1500px;top:-760px;right:-600px;
          background:radial-gradient(circle closest-side,rgba(201,162,39,.20),transparent 70%);}
  .halo-2{width:1100px;height:1100px;bottom:-580px;left:-420px;
          background:radial-gradient(circle closest-side,rgba(201,162,39,.12),transparent 70%);}
  .capa{position:relative;z-index:1;display:flex;flex-direction:column;height:100%;}
  .cuerpo{flex:1;display:flex;flex-direction:column;justify-content:center;}
  .filete{width:${110*g}px;height:4px;background:#D4A857;margin-bottom:${38*g}px;}
  .volanta{font-size:${26*g}px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;
           color:#D4A857;margin-bottom:${26*g}px;}
  h1{font-weight:600;line-height:1.14;letter-spacing:-.01em;}
  .portada h1{font-size:${86*g}px;}
  .punto h1{font-size:${70*g}px;}
  .cierre h1{font-size:${86*g}px;}
  .bajada{font-size:${36*g}px;line-height:1.5;color:#A89E90;margin-top:${30*g}px;}
  .num{font-family:'EBG',serif;font-size:${120*g}px;color:#D4A857;line-height:.9;margin-bottom:${22*g}px;}
  .texto{font-size:${36*g}px;line-height:1.55;color:#A89E90;margin-top:${26*g}px;}
  /* placa de dato: la cifra manda */
  .cifra{font-size:${260*g}px;font-weight:700;color:#D4A857;line-height:.85;letter-spacing:-.04em;}
  .dato h1{font-size:${56*g}px;font-weight:500;margin-top:${18*g}px;color:#fff;}
  .dato .texto{border-top:2px solid rgba(255,255,255,.16);padding-top:${28*g}px;margin-top:${38*g}px;}
  .cta{background:#D4A857;color:#17140F;border-radius:999px;padding:${26*g}px ${52*g}px;
       font-size:${32*g}px;font-weight:700;align-self:flex-start;margin-top:${44*g}px;}
  .pie{display:flex;justify-content:space-between;align-items:flex-end;
       padding-top:${34*g}px;border-top:2px solid rgba(255,255,255,.14);}
  .pie .marca{font-size:${34*g}px;font-weight:700;}
  .pie .arroba{font-size:${26*g}px;color:#D4A857;font-weight:500;}`;
}

function cuerpo(p, datos){
  switch(p.tipo){
    case 'portada': return `
      <div class="filete"></div>
      ${p.volanta ? `<p class="volanta">${p.volanta}</p>` : ''}
      <h1>${p.titulo}</h1>
      ${p.bajada ? `<p class="bajada">${p.bajada}</p>` : ''}`;
    case 'punto': return `
      <p class="num">${p.n}</p>
      <h1>${p.titulo}</h1>
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
    case 'dato': return `
      <p class="cifra">${p.cifra}</p>
      <h1>${p.titulo}</h1>
      ${p.texto ? `<p class="texto">${p.texto}</p>` : ''}`;
    default: return `
      <div class="filete"></div>
      <h1>${p.titulo}</h1>
      ${p.bajada ? `<p class="bajada">${p.bajada}</p>` : ''}
      <div class="cta">${datos.cta}</div>`;
  }
}

function html(p, datos, formato){
  const clase = p.tipo === 'cierre' ? 'cierre' : p.tipo;
  return `<!doctype html><meta charset="utf-8"><style>${estilos(formato)}</style>
<div class="placa">
  <div class="halo halo-1"></div><div class="halo halo-2"></div>
  <div class="capa ${clase}">
    <div class="cuerpo">${cuerpo(p, datos)}</div>
    <div class="pie">
      <span class="marca">${datos.marca}</span>
      <span class="arroba">${datos.contacto}</span>
    </div>
  </div>
</div>`;
}
module.exports = { html, ANCHO, ALTO, SEGURA };
