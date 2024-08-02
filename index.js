const puppeteer = require('puppeteer');

const codeObj = require('./codes.js')

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
  })
  // .then(function () {
  //   let waitFor3Seconds = page.waitForResponse(3000);
  //   return waitFor3Seconds;
  // })
  .then(function () {
    let allChallengesPromises = page.$$(".challenge-submit-btn", { delay: 50 });
    return allChallengesPromises;
  })
  .then(function (questionArr) {
    console.log("number of questions: " + questionArr.length);
    let questionSolved = questionSolver(
      page,
      questionArr[0],
      codeObj.answers[0]
    );
    return questionSolved;
  })
  .catch(function (error) {
    console.error(error);
  });







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


function questionSolver( page, question, answer) {
  return new Promise(function (resolve, reject) { 
    let questionClicked = question.click();
    questionClicked
      .then(function () {
        let editorInPromise = waitAndClick(".hr-monaco-editor-parent", page);
        return editorInPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return page.waitForSelector(
          "textarea.input.text-area.custominput.auto-width",
          page
        );
      })
      .then(function () {
        return page.type(
          "textarea.input.text-area.custominput.auto-width",
          answer,
          { delay: 50 }
        );
      })
      .then(function () {
        let ctrlPassed = page.keyboard.down("Control");
        return ctrlPassed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 100 });
        return AisPressed;
      })
      .then(function () {
        let XisPressed = page.keyboard.press("X", { delay: 100 });
        return XisPressed;
      })
      .then(function () {
        let controlisUnpressed = page.keyboard.up("Control");
        return controlisUnpressed;
      })
      .then(function () {
        let mainEditorFocus = waitAndClick(".hr-monaco-editor-parent", page);
        return mainEditorFocus;
      })
      .then(function () {
        let ctrlPassed = page.keyboard.down("Control");
        return ctrlPassed;
      })
      .then(function () {
        let AisPressed = page.keyboard.press("A", { delay: 100 });
        return AisPressed;
      })
      .then(function () {
        let VisPressed = page.keyboard.press("V", { delay: 100 });
        return VisPressed;
      })
      .then(function () {
        let controlisUnpressed = page.keyboard.up("Control");
        return controlisUnpressed;
      }).then(function () {
        return page.click(".ui-content align-icon-right", { delay: 50 });
      }).then(function () { 
        resolve()
      }).catch(function (err) { 
        reject();
      })
  })
}