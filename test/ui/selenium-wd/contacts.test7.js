const {exec, execSync} = require('child_process');

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

execSync('npm run load_schema && npm run load_contacts');

let driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.get('http://localhost:3000/contacts/new')
.then(() => driver.findElement(By.name('first_name')).sendKeys('Rhonda'))
.then(() => driver.findElement(By.name('last_name')).sendKeys('Smith'))
.then(() => driver.findElement(By.css('input[value=\'Add Contact\']')).click())
.then(() => driver.findElement(By.css('h1')))
.then(
  element => driver.wait(until.elementTextIs(element, 'Rhonda Smith'), 3000)
)
.then(() => driver.quit())
.then(() => {
  driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
})
.then(() => exec('npm run load_schema && npm run load_contacts'))
.then(() => driver.get('http://localhost:3000/contacts/new'))
.then(() => driver.findElement(By.name('first_name')).sendKeys('Rhonda'))
.then(() => driver.findElement(By.name('last_name')).sendKeys('Smith'))
.then(() => driver.findElement(By.css('input[value=\'Add Contact\']')).click())
.then(() => driver.findElement(By.css('h1')))
.then(
  element => driver.wait(until.elementTextIs(element, 'Rhonda Jones'), 3000)
)
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Here is the error message, which should say that an '
    + 'element with text “Rhonda Jones” could not be found:\n'
    + error.message
  );
  driver.quit();
});
