const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'

context('UI tests', function() {

  const browser = new Browser();
  execSync('npm run load_schema && npm run load_contacts');
  before(function() {
    console.log('About to visit page.');
    console.log('browser 1 keys:\n' + Object.keys(browser));
    console.log('browser 1 headers:\n' + browser.headers);
    return browser.visit(url);
  });

  describe('Deletion of 1 contact on list page', function() {

    before(function() {
      return browser.pressButton('delete contact');
    });
    it('Successful submission', function() {
      browser.assert.success();
      console.log(
        'browser.assert 1 keys:\n' + Object.keys(browser.assert)
      );
    });
    it('Page appearing after button press', function() {
      console.log(
        'browser.assert 2 keys:\n' + Object.keys(browser.assert)
      );
      browser.assert.text('h1', 'Contacts');
    });
  });

})
