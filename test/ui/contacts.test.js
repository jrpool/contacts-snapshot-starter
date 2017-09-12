const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'
const browser = new Browser();

context('ui tests', function() {
  beforeEach(function() {
    execSync('npm run load_schema && npm run load_contacts')
  })

  describe(`/contacts/new`, function() {
    before(function(done) {
      browser.visit(url + '/contacts/new', done);
    });
    describe('displays form', function() {
      it(`should display a contact form`, function() {
        browser.assert.element('form[class=new-contact-form]');
      })
    })

    describe('submits form', function() {
      before(function(done) {
        browser
        .fill('first_name', 'Rhonda')
        .fill('last_name', 'Smith')
        .pressButton('Add Contact', done);
      });
      it.only('should see welcome page', function() {
        browser.assert.text('h1', 'Rhonda Smith');
      });
    })
  })

})
