
const puppeteer = require("puppeteer");
const colors = require('colors');
const log = require('./logger');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

(async function main(){
  try {
    let width = 1920;
    let height = 1080;
    const browser = await puppeteer.launch({headless: false, args:[`--window-size=${ width },${ height }`],});
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36");
    console.log("Undefeated Account Generator".yellow);
    console.log("-------------------".green);
    console.log("Made by @sharkmigu3".yellow);
    console.log("-------------------".green);
    await page.setViewport({ width, height });
      let email = "test"; // put your email here if your email is test123@gmail.com put only "test123"
      let names = ["Mike","Paul", "John","Hugo","Lisa","Alex","Sean","Carlos","Miguel"]; // you can add more names
      let lastNames =["Smith","Hernandez", "Murdock","Doug","Swisher","Garrison","Barber","Harrick","Abramson"]; // ^^^^

      let uName = names[Math.floor(Math.random()*names.length)];
      let uLast = lastNames[Math.floor(Math.random()*lastNames.length)];
      let randNum = Math.floor(Math.random() * 999999) + 1;
      let jigEmail = email + "+" + randNum + "@gmail.com";
      let password = "UNDFTD123!"; // password for all the accounts made

      async function createAcc() {
        await page.goto("https://undefeated.com/account/login");
      log("Entering Website..".blue);
        await page.type("#first_name", uName);
        await page.type("#last_name", uLast);
        await page.type("#email", jigEmail);
        await page.type("#password", password,);
      log("Account Email: ".green + jigEmail);
        await page.click("#register-form > div.control-wrapper.last > button");
      log("Solve Captcha...".blue);
      log("Account created".green);
      await page.deleteCookie();
      }
      createAcc();


  } catch(e) {
    log(console.log("error is: ".red, e));
  }
})();
