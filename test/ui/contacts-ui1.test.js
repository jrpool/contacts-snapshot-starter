const {webdriver, By, until, driver, reloadDatabase} = require('../helpers/ui.js')

reloadDatabase()
driver.get('http://localhost:3000/contacts/new')
.then(() => driver.findElement(By.name('first_name')).sendKeys('Rhonda'))
.then(() => driver.findElement(By.name('last_name')).sendKeys('Smith'))
.then(() => driver.findElement(By.css('input[value=\'Add Contact\']')).click())
.then(() => driver.findElement(By.css('h1')))
.then(
  element => {
    driver.wait(until.elementTextIs(element, 'Rhonda Smith'), 3000);
  }
)
.then(() => driver.getPageSource())
.then(source => {
  return source.includes('Smith')
})
.then(answer => {
  if (answer) {
    console.log(
      'Test 1: Are we correctly rendering a new contact on the page?\n'
      + 'Yes, new contact Rhonda Smith has been found'
    );
    return true;
  }
  else {
    throw 'Rhonda Smith not found in page.';
  }
})
.then(() => reloadDatabase())
.then(() => driver.sleep(3000))
.then(() => driver.get('http://localhost:3000/contacts/new'))
.then(() => driver.findElement(By.name('first_name')).sendKeys('Rhonda'))
.then(() => driver.findElement(By.name('last_name')).sendKeys('Smith'))
.then(() => driver.findElement(By.css('input[value=\'Add Contact\']')).click())
.then(() => driver.findElement(By.css('h1')))
.then(
  element => {
    driver.wait(until.elementTextIs(element, 'Rhonda Smith'), 3000);
  }
)
.then(() => driver.getPageSource())
.then(source => source.includes('Jones'))
.then(answer => {
  if (answer) {
    return true;
  }
  else {
    throw 'Rhonda Jones not found in page.';
  }
})
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Test 1: Making sure it wasn\'t false positive with failing test:\n'
    + 'Here is the error message, which should say that\n'
    + '“Rhonda Jones” was not found in the page:\n'
    + error
    +'\n'
  );
  driver.quit();
});
