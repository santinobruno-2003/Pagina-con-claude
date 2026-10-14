const { chromium } = require('playwright');
const D = '/home/user/Pagina-con-claude/barrio';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + D + '/folleto.html', { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  const sobra = await p.evaluate(() => {
    const c = document.querySelector('.capa');
    return +((c.scrollHeight - c.clientHeight) / (96/25.4)).toFixed(1);
  });
  console.log('desborde:', sobra, 'mm');
  await p.pdf({ path: D + '/stackdigital-barrio.pdf', format: 'A4',
                printBackground: true, margin: {top:0,bottom:0,left:0,right:0} });
  await b.close();
})();
