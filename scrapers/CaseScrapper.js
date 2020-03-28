const writeFileSync = require("fs").writeFileSync;
class CaseScrapper {

    constructor(browser, page) {
        this.browser = browser;
        this.page = page;

        this.cases = [];
        this.url = 'https://webcache.googleusercontent.com/search?q=cache:https://mohfw.gov.in/'
    }

    evaluatePage() {

        const container = document.querySelector("#cases");
        console.log(container)
        const arr = Array.from(container.querySelectorAll("tbody > tr ")).map((state, i, arr) => {
            try {

                const getData = child => state.querySelector(`td:nth-child(${child})`).innerText;
                const getTotalData = child => state.querySelector(`td:nth-child(${child})>strong`).innerText;

                if (i == arr.length - 2) {
                    return {
                        state: "India",
                        total_national: getTotalData(2),
                        total_foreign: getTotalData(3),
                        cured: getTotalData(4),
                        death: getTotalData(5),
                        fetchedAt: JSON.stringify(new Date()),
                        fetchedFrom: 'https://webcache.googleusercontent.com/search?q=cache:https://mohfw.gov.in/'
                    }
                }
                else if (i < arr.length - 2) {
                    return {
                        state: getData(2),
                        total_national: getData(3),
                        total_foreign: getData(4),
                        cured: getData(5),
                        death: getData(6)
                    }
                }
            } catch (error) {
                return error.stack || error
            }


        })
        return arr
    }

    async main() {
        await this.page.goto(this.url, { waitUntil: "domcontentloaded" })
        await this.page.waitFor(5000);

        this.cases = await this.page.evaluate(this.evaluatePage)

        this.writeToJson();
        return this.cases;
    }

    writeToJson() {
        writeFileSync("./data/cases.json", JSON.stringify(this.cases));
    }

};

module.exports = CaseScrapper