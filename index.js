const puppeteer = require('puppeteer');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = 'xyz742406@gmail.com';
const password = 'xyz@1234';

let browserOpen = puppeteer.launch({
    headless: false,
    
    args: ['--start-maximized'],
    
    defaultViewport: null
})

let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
  })
  .then(function () {
    let emailIsEntered = page.type("input[type='text']", email, { delay: 50 });
    return emailIsEntered;
  })
  .then(function () {
    let passwordIsEntered = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordIsEntered;
  })
  .then(function () {
    let loginButtonClick = page.click('button[type="button"]', { delay: 50 });
    return loginButtonClick;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick(
      ".topic-card a[data-analytics='SelectTopic']",
      page
    );
    return clickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmUp = waitAndClick("input[value='warmup']", page);
    return getToWarmUp;
  }).then(function () {
    let waitFor3Seconds = waitFor(3000);
    return waitFor3Seconds;
  })







function waitAndClick(selector, cPage) {
    return new Promise((resolve, reject) => {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () { 
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (error) { 
            reject();
        })
    })
}