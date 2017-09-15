const {webdriver, By, until, driver, reloadDatabase} = require('../helpers/db.js')

driver.get('http://localhost:3000/contacts/1')
.then(() => driver.findElement(
  By.css('form[action=\'/contacts/1?_method=DELETE\'] > button')
).click())
.then(() => driver.wait(until.alertIsPresent(), 500))
.then(alert => alert.accept())
.then(() => driver.sleep(500)) // Must be about 100ms+ to await new page.
.then(() => driver.getPageSource())
.then(source => {
  return !source.includes('contacts/1?');
})
.then(answer => {
  if (answer) {
    return true;
  }
  else {
    throw 'Deleted contact #1 still found in page.';
  }
})
.then(() => reloadDatabase())
.then(() => driver.get('http://localhost:3000/contacts/1'))
.then(() => driver.findElement(
  By.css('form[action=\'/contacts/1?_method=DELETE\'] > button'
)).click())
.then(() => driver.wait(until.alertIsPresent(), 500))
.then(alert => alert.accept())
.then(() => driver.sleep(500))
.then(() => driver.getPageSource())
.then(source => {
  return source.includes('contacts/1?');
})
.then(answer => {
  if (answer) {
    return true;
  }
  else {
    throw 'Deleted contact #1 not found in page.';
  }
})
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Here is the error message, which should say that the page\n'
    + 'fails to include contact 1 (which the driver was told to\n'
    + 'find after it was deleted):\n'
    + error
  );
  driver.quit();
});
