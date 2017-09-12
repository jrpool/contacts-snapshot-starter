const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'
const browser = new Browser();

describe(`/contacts/new`, function() {
  before(function(done) {
  browser.visit(url + '/contacts/new', done);
});
  it.only(`should display a contact form`, function() {
    browser.assert.element('form[class=new-contact-form]');
  })
})
