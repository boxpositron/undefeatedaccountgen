const puppeteer = require('puppeteer');
const log = require('./logger');
const names = require('./names');
const fs = require('fs');
const debounce = require('lodash').debounce;

const EMAIL = 'test'; // put your email here if your email is test123@gmail.com put only 'test123'
const PASSWORD = 'UNDFTD123!'; // password for generated accounts
const OUTPUT_PATH = 'accounts.txt'; //output file containing generated accounts
const CHROME_PATH = ''; // path to chrome executable 
const MAX_ACCOUNTS = 2; // total accounts needed to be generated
const RETRY_DELAY = 5000; // delay between generation attempts
const MAX_FAILURES = 5; // maximum number of failures before terminating application

process.setMaxListeners(0); // Prevent memory leaks

process.on('SIGHUP', function () {
  process.exit(); // Shutdown properly
});

const intro = () => {
  log('Undefeated Account Generator');
  log('----------------------------');
  log('Created by @sharkmigu3');
  log('Updated by @boxpositron');
  log('----------------------------');
}

const generatePayload = () => {

  const suffix = Math.ceil(Math.random() * 999999);

  const first_name = names[Math.floor(Math.random() * names.length)];
  const last_name = names[Math.floor(Math.random() * names.length)];
  const email = `${EMAIL}+${suffix}@gmail.com`;

  return {
    first_name,
    last_name,
    email
  }

}

const save = payload => {
  fs.appendFile(OUTPUT_PATH, `\n${payload.email}:${PASSWORD}`, (err) => {
    if (err) throw err;
  });
}

(async function main() {
  try {
    const width = 1920;
    const height = 1080;


    intro()

    const options = {
      headless: false,
      args: [`--window-size=${width},${height}`]
    };

    CHROME_PATH ? options.executablePath = CHROME_PATH : null;

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.79 Safari/537.36');


    await page.setViewport({
      width,
      height
    });

    let accounts_created = 0;
    let failed_attempts = 0;

    async function checkAccount(result, payload) {
      if (result.url() === 'https://undefeated.com/account') {

        log('Account created', 'success');
        accounts_created++

        await page.deleteCookie();

        save(payload);
        failed_attempts = 0;
        debounce(() => {
          accounts_created >= MAX_ACCOUNTS ? process.exit() : createAccount();
        }, RETRY_DELAY)();
      }
    }


    async function createAccount() {
      try {

        await page.goto('https://undefeated.com/account/login');
        log('Loading Website', 'info');

        const payload = generatePayload();
        log('Generating Payload', 'info');


        await page.type('#first_name', payload.first_name);
        await page.type('#last_name', payload.last_name);
        await page.type('#email', payload.email);
        await page.type('#password', PASSWORD);

        const navigationOptions = {
          waitUntil: 'load',
          timeout: 0
        }

        let navigationPromise = page.waitForNavigation(navigationOptions);
        await page.click('#register-form > div.control-wrapper.last > button');

        const response = await navigationPromise;

        checkAccount(response, payload)

        if (response.url() === 'https://undefeated.com/challenge') {
          log('Solve CAPTCHA', 'info');
        }

        const result = await page.waitForNavigation(navigationOptions);

        checkAccount(result, payload)

      } catch (e) {
        log(`Generation Error | ${e}`, 'error')
        if (failed_attempts >= MAX_FAILURES){
          log(`Max Failures | Application will now exit`)
          return process.exit()
        }

        failed_attempts++
        
        debounce(() => {
          accounts_created >= MAX_ACCOUNTS ? process.exit() : createAccount();
        }, RETRY_DELAY)();
      }
    }

    createAccount();

  } catch (e) {
    log(`Operation Error | ${e}`, 'error');
    process.exit();
  }
})();