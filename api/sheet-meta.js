// Vercel Serverless Function: /api/sheet-meta
// อ่านรายชื่อแผ่นงาน (ชื่อ + gid) จาก Google Sheets ที่เผยแพร่แล้ว
// ใช้แทน server.py ตอนรันบน Vercel/GitHub Pages แบบมี backend
export default async function handler(req, res) {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQddMtyJDO7ALPMqiYCuWIjkjB2tdcTgsp3ExWzjrdaVriC0H_qCo2zggnND7QVYGygJXEtMUUDY71y/pubhtml';
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) {
      res.status(r.status).send('upstream ' + r.status);
      return;
    }
    const html = await r.text();
    const items = [];
    const re = /items\.push\(\{name: "([^"]+)", pageUrl: "[^"]*?gid=(\d+)"/g;
    let m;
    while ((m = re.exec(html))) items.push({ name: m[1], gid: m[2] });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify(items));
  } catch (e) {
    res.status(502).send(String(e));
  }
}
