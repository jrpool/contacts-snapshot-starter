const {webdriver, By, until, driver, reloadDatabase}
  = require('../helpers/ui.js');

reloadDatabase();
driver.get('http://localhost:3000')
.then(()=> driver.findElement(By.partialLinkText('Jared')))
.then(()=> driver.findElement(By.partialLinkText('Tanner')))
.then(()=> driver.findElement(By.partialLinkText('NeEddra')))
.then(() => driver.sleep(500))
.then(() => {
  console.log(
    'Test 2: Are we correctly rendering a list of contacts on the homepage?\n'
    + 'Yes, all three test data contacts have been found.'
  )
})
.then(() => reloadDatabase())
.then(() => driver.get('http://localhost:3000'))
.then(() => driver.findElement(By.partialLinkText('Rhonda')))
.then(() => driver.quit())
.catch(error => {
  console.log(
    'Test 2: Making sure it wasn\'t false positive with failing test:\n'
    + 'Here is the error message, which should say that\n'
    + 'an element with link text “Rhonda” could not be found:\n'
    + error.message
    + '\n'
  );
  driver.quit();
});
