const puppeteer = require("puppeteer-core");
const { execSync } = require("child_process");
const path = require("path");

const CHROME = execSync("find /root/.cache/puppeteer/chrome -name chrome -type f | head -1").toString().trim();
const BASE = process.env.BASE || "http://localhost:8123";
const OUT = path.join(__dirname, "..", "shots");
require("fs").mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const errs = [];
  page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", e => errs.push("PAGEERR: " + e.message));

  await page.goto(BASE + "/index.html", { waitUntil: "networkidle0" });
  await page.waitForSelector(".mode-card");
  await page.screenshot({ path: path.join(OUT, "1_home.png") });

  await page.click('.mode-card[data-mode="b"]');
  await page.waitForSelector(".cat-tile");
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(OUT, "2_categories.png") });

  // 拡張編のカテゴリも（連語など多品詞）
  await page.click("#backBtn");
  await page.waitForSelector('.mode-card');
  await page.click('.mode-card[data-mode="e"]');
  await page.waitForSelector(".cat-tile");
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(OUT, "3_categories_ext.png") });

  // 学習画面（動詞）
  await page.evaluate(() => {
    const t = Array.from(document.querySelectorAll(".cat-tile")).find(x => x.getAttribute("data-pos") === "動詞");
    t.click();
  });
  await page.waitForSelector("#card");
  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(OUT, "4_study_front.png") });

  // 答えを見る
  await page.click("#card");
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(OUT, "5_study_back.png") });

  // 設定
  await page.click("#topRight");
  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: path.join(OUT, "6_settings.png") });

  console.log("console errors:", errs.length ? errs : "none");
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
