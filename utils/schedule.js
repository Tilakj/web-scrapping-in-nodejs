const spawn = require("child_process").spawn;
const schedule = require("node-schedule");

schedule.scheduleJob("50 * * * *", () => {
  console.log("Launching standings scraper.\n");
  spawn("node", ["scrapperIndex.js"]);
});