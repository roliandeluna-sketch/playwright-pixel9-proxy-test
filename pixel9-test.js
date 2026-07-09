const { chromium } = require("playwright");

const URL = "https://ysyglobaloffers.netlify.app/";

const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));


const device = {

  name: "Pixel_9_US",

  config: {
    viewport: {
      width: 412,
      height: 915
    },

    userAgent:
      "Mozilla/5.0 (Linux; Android 15; Pixel 9)",

    isMobile: true,
    hasTouch: true
  },


  locale: "en-US",
  timezoneId: "America/Los_Angeles",


  // 🔹 PON TU PROXY AQUÍ
  proxy: {
    server: "socks5:// geo.vibeproxies.com:1080",
    username: "260708019xkyz9e-country-US-state-nevada-session-79uo7xcy-time-short",
    password: "50qeiajmpk6c"
  }

};



(async () => {

  const browser = await chromium.launch({
    headless: true
  });


  const context = await browser.newContext({

    ...device.config,

    locale: device.locale,

    timezoneId: device.timezoneId,


    proxy: {
      server: device.proxy.server,
      username: device.proxy.username,
      password: device.proxy.password
    }

  });


  const page = await context.newPage();


  try {

    console.log("🚀 Iniciando prueba:", device.name);


    await page.goto(URL, {
      waitUntil: "domcontentloaded"
    });


    console.log("✅ Página cargada");


    // Tiempo inicial
    await sleep(10000);


    // Scroll 1
    await page.mouse.wheel(0, 500);
    await sleep(4000);


    // Scroll 2
    await page.mouse.wheel(0, 700);
    await sleep(4000);


    // Buscar elementos clickeables visibles
    const clickable = page.locator(
      "button:visible, a:visible, [role='button']:visible, input:visible"
    );


    const count = await clickable.count();

    console.log(
      "🖱️ Elementos clickeables encontrados:",
      count
    );


    // Hasta 3 clicks de prueba
    const clicks = Math.min(3, count);


    for (let i = 0; i < clicks; i++) {

      try {

        await clickable.nth(i).click({
          timeout: 3000
        });

        console.log(
          `✅ Click ${i + 1} realizado`
        );

        await sleep(3000);

      } catch (e) {

        console.log(
          `⚠️ No se pudo clicar elemento ${i + 1}`
        );

      }

    }


    await page.screenshot({
      path: "qa-result.png",
      fullPage: true
    });


    console.log("📸 Captura guardada");


  } catch (error) {

    console.log(
      "❌ Error:",
      error.message
    );

  }


  await context.close();

  await browser.close();


  console.log("🏁 Prueba terminada");

})();
