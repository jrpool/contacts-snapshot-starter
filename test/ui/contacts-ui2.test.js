const {exec, execSync} = require('child_process');

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

execSync('npm run load_schema && npm run load_contacts');

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://localhost:3000')
.then(()=> driver.findElement(By.partialLinkText('Jared')))
.then(()=> driver.findElement(By.partialLinkText('Tanner')))
.then(()=> driver.findElement(By.partialLinkText('NeEddra')))
.then(() => driver.quit())
.then(() => exec('npm run load_schema && npm run load_contacts'))
.then(() => {
  driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
})
.then(() => driver.get('http://localhost:3000'))
.then(() => driver.findElement(By.partialLinkText('Rhonda')))
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Here is the error message, which should say that\n'
    + 'an element with link text “Rhonda” could not be found:\n'
    + error.message
  );
  driver.quit();
});
