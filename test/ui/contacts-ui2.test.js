const {webdriver, By, until, driver, reloadDatabase} = require('../helpers/db.js')

driver.get('http://localhost:3000')
.then(()=> driver.findElement(By.partialLinkText('Jared')))
.then(()=> driver.findElement(By.partialLinkText('Tanner')))
.then(()=> driver.findElement(By.partialLinkText('NeEddra')))
.then(() => reloadDatabase())
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
