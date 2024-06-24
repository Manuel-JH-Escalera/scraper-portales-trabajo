const puppeteer = require('puppeteer');
require("dotenv").config();

async function chiletrabajos() {
    const browser = await puppeteer.launch({
        args: [
            "--disble-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ],
        executablePath: process.env.NODE_ENV === "production" 
        ? process.env.PUPPETEER_EXECUTABLE_PATH 
        : puppeteer.executablePath()
    });
    const page = await browser.newPage();
    await page.goto('https://www.chiletrabajos.cl/encuentra-un-empleo?2=&13=&fecha=1&categoria=&8=&14=&inclusion=&f=2');
    data = await page.evaluate(() => {
        const elements = document.querySelectorAll('.job-item.with-thumb.destacado.no-hover');
        const items = [];
        elements.forEach((element) => {
        const item = {
            title: element.querySelector('a.font-weight-bold').innerText,
            link: element.querySelector('a.font-weight-bold').href,
            company: element.querySelector('h3.meta').childNodes[0].textContent.trim().replace(/,\s*$/, ''),
            location: element.querySelector('h3.meta a').innerText,
            date: element.querySelector('h3.meta:nth-of-type(2) a').innerText.trim(),
        };
        items.push(item);
        });
        return items;
        });
    await browser.close();
    return data;
}

module.exports = chiletrabajos;