const {exec, execSync} = require('child_process');

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

execSync('npm run load_schema && npm run load_contacts');

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('http://localhost:3000/contacts/new')
.then(() => driver.findElement(By.className('new-contact-form')))
.then(() => driver.quit())
.then(() => {
  driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
})
.then(() => exec('npm run load_schema && npm run load_contacts'))
.then(() => driver.get('http://localhost:3000/contacts/new'))
.then(() => driver.findElement(By.className('new-contact-formx')))
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Here is the error message, which should say that an\n'
    + 'element with class name new-contact-formx could not\n'
    + 'be found:\n'
    + error.message
  );
  driver.quit();
});
