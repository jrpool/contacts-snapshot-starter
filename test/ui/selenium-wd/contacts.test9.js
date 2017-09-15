const {exec, execSync} = require('child_process');

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

execSync('npm run load_schema && npm run load_contacts');

let driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

driver.get('http://localhost:3000')
.then(() => driver.findElement(
  By.css('form[action=\'/contacts/2?_method=DELETE\'] > button'
)).click())
.then(() => driver.wait(until.alertIsPresent(), 500))
.then(alert => alert.accept())
.then(() => driver.sleep(500)) // Must be about 100ms+ to await new page.
.then(() => driver.getPageSource())
.then(source => {
  return !source.includes('contacts/2?');
})
.then(answer => {
  if (answer) {
    return true;
  }
  else {
    throw 'Deleted contact #2 still found in page.';
  }
})
.then(() => driver.quit())
// .then(() => driver.sleep(1000))
.then(() => exec('npm run load_schema && npm run load_contacts'))
.then(() => {
  driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
})
.then(() => driver.get('http://localhost:3000'))
.then(() => driver.findElement(
  By.css('form[action=\'/contacts/2?_method=DELETE\'] > button'
)).click())
.then(() => driver.wait(until.alertIsPresent(), 500))
.then(alert => alert.accept())
.then(() => driver.sleep(500))
.then(() => driver.getPageSource())
.then(source => {
  return source.includes('contacts/2?');
})
.then(answer => {
  if (answer) {
    return true;
  }
  else {
    throw 'Deleted contact #2 not found in page.';
  }
})
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Here is the error message, which should say that the page\n'
    + 'fails to include contact 2 (which the driver was told to\n'
    + 'find after it was deleted):\n'
    + error
  );
  driver.quit();
});
