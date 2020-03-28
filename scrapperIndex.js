const puppeteer = require('puppeteer')
const CaseScrapper = require('./scrapers/CaseScrapper')

const startScrapper = async () => {
    let browser;
    let page;

    try {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
        const res = await new CaseScrapper(browser, page).main()
    }
    catch (error) {
        console.log(error.stack || error);
    }
    await browser.close();
}

startScrapper();
console.log("started scrapper")
// https://www.youtube.com/watch?v=_DB77Fliclk