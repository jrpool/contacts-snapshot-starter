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
      it('should see welcome page', function() {
        browser.assert.text('h1', 'Rhonda Smith');
      });
    })
  })

  describe('/', function() {
    before(function(done) {
      browser.visit(url, done);
    });
    it('should display a list of contacts', function() {
      browser.assert.elements('div[class=contact-list-member]', 3)
    })
  })

  describe('/contacts/3', function() {
    before(function(done) {
      browser.visit(url + '/contacts/3', done);
    });
    it.only('should alert to confirm deletion', function() {
      browser.pressButton('.delete-contact', function() {
        browser.prompted('Are you sure you want to delete this contact?')
      })
    })
  })

})
