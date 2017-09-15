const {webdriver, By, until, driver, reloadDatabase} = require('../helpers/ui.js')

driver.get('http://localhost:3000')
.then(() => driver.findElement(
  By.css('form[action=\'/contacts/2?_method=DELETE\'] > button')
).click())
.then(() => driver.wait(until.alertIsPresent(), 500))
.then(alert => alert.accept())
.then(() => driver.sleep(500)) // Must be about 100ms+ to await new page.
.then(() => driver.getPageSource())
.then(source => {
  return !source.includes('contacts/2?');
})
.then(answer => {
  if (answer) {
    console.log(
      'Test 3: Are we correctly deleting a contact from the home page?\n'
      + 'Yes, contact 2 has been deleted.'
    );
    return true;
  }
  else {
    throw 'Deleted contact #2 still found in page.';
  }
})
.then(() => reloadDatabase())
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
    'Test 3: Making sure it wasn\'t false positive with failing test:\n'
    + 'Here is the error message, which should say that the page\n'
    + 'fails to include contact 2 (which the driver was told to\n'
    + 'find after it was deleted):\n'
    + error
    + '\n'
  );
  driver.quit();
});
