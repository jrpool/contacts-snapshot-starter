const {webdriver, By, until, driver, reloadDatabase}
  = require('../helpers/ui.js');

driver.get('http://localhost:3000/contacts/new')
.then(() => driver.findElement(By.className('new-contact-form')))
.then(() => {
  console.log('Test 0: Are we reaching new-contact-form?\n'
+ 'Yes, new-contact-form has been found.'
)})
.then(() => reloadDatabase())
.then(() => driver.get('http://localhost:3000/contacts/new'))
.then(() => driver.findElement(By.className('new-contact-formx')))
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Test 0: Making sure it wasn\'t false positive with failing test:\n'
    + 'Here is the error message, which should say that an\n'
    + 'element with class name new-contact-formx could not\n'
    + 'be found:\n'
    + error.message
    + '\n'
  );
  driver.quit();
});
