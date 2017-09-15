const {browser, By, makeDriver, reload, until} = require('../helpers/db');

reload();

let driver = makeDriver();

driver.get('http://localhost:3000/contacts/new')
.then(() => driver.getPageSource())
.then(source => console.log('Source:\n' + source))
.then(() => driver.findElement(By.className('new-contact-form')))
.then(() => driver.quit())
.then(() => driver = makeDriver())
.then(() => reload())
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
