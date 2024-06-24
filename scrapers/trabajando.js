const puppeteer = require('puppeteer');
require("dotenv").config();

async function trabajando() {
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
    await page.goto('https://www.trabajando.cl/trabajo-empleo/?fechaPublicacion=20240622', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const elements = document.querySelectorAll('div.result-box-container');
        const items = [];
        elements.forEach((element) => {
            const titleElement = element.querySelector('div.center h2 a');
            const companyElement = element.querySelector('span.type');
            const locationElement = element.querySelector('span.location');
            const dateElement = element.querySelector('span.date.mb-3.mb-md-0');
            const descriptionElement = element.querySelector('p.description');

            if (titleElement && companyElement && locationElement && dateElement) {
                const item = {
                    title: titleElement.innerText,
                    link: titleElement.href,
                    company: companyElement.innerText,
                    location: locationElement.innerText,
                    date: dateElement.innerText,
                    description: descriptionElement ? descriptionElement.innerText : '',
                };
                items.push(item);
            }
        });
        return items;
    });

    await browser.close();
    return data;
}

module.exports = trabajando;