const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { html, ANCHO, ALTO } = require('./plantilla.js');

(async () => {
  const datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'contenido.json'), 'utf8'));
  const navegador = await chromium.launch();
  for (const formato of ['carrusel', 'historia']) {
    const salida = path.join(__dirname, 'salida', formato);
    fs.mkdirSync(salida, { recursive: true });
    const pagina = await navegador.newPage({ viewport: { width: ANCHO, height: ALTO[formato] } });
    for (const [i, placa] of datos[formato].entries()) {
      const tmp = path.join(__dirname, `.placa-${formato}.html`);
      fs.writeFileSync(tmp, html(placa, datos, formato, i, datos[formato].length));
      await pagina.goto('file://' + tmp);
      await pagina.evaluate(() => document.fonts.ready);
      await pagina.waitForTimeout(250);
      const archivo = path.join(salida, `${formato}-${String(i + 1).padStart(2, '0')}.png`);
      await pagina.screenshot({ path: archivo });
      fs.unlinkSync(tmp);
      console.log('→', path.relative(__dirname, archivo));
    }
    await pagina.close();
  }
  await navegador.close();
})();
