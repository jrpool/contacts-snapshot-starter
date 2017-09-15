const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'
let browser = new Browser();

context('ui tests', function() {
  beforeEach(function() {
    console.log('This beforeEach function is doing stuff')
    execSync('npm run load_schema && npm run load_contacts')
  })

  describe('display new contact form', function() {
    beforeEach(function(done) {
      // browser = new Browser();
      browser.visit(url + '/contacts/new', done);
    });
      it(`should display a contact form`, function() {
        browser.assert.element('form[class=new-contact-form]');
      }) //passing, fail conditions behaving properly
  })

  describe('submit new contact form', function() {
    beforeEach(function(done) {
      // browser = new Browser();
      browser.visit(url + '/contacts/new', done);
    });
    beforeEach(function(done) {
      browser
      .fill('first_name', 'Rhonda')
      .fill('last_name', 'Smith')
      .pressButton('Add Contact', done);
    });
      it('should see contact detail page', function() {
        browser.assert.text('h1', 'Rhonda Smith');
      });
  }) //passing, fail conditions behaving properly

    describe('home page displays list of contacts', function() {
      beforeEach(function(done) {
        // browser = new Browser();
        browser.visit(url, done);
      });
      it('should display a list of contacts', function() {
        browser.assert.elements('div[class=contact-list-member]', 3)
        browser.assert.elements('button[class=delete-contact]', 3)
      }) //passing, fail conditions behaving properly
    })

    describe('home page alerts before deletion of a contact', function() {
      beforeEach(function(done) {
        // browser = new Browser();
        browser.visit(url, done);
      });
      it('should alert to confirm deletion', function() {
        browser.pressButton('.delete-contact', function() {
          browser.prompted('Are you sure you want to delete this contact?')
        }) //this one keeps passing no matter what
      }) //and the actual deletion is happening
    })

    describe('individual contact page', function() {
      beforeEach(function(done) {
        // browser = new Browser();
        browser.visit(url + '/contacts/1', done);
      });
      it('should alert to confirm deletion', function() {
        browser.pressButton('.delete-contact', function() {
          browser.prompted('Are you sure you want to delete this contact?')
        })
      })
    })
    //individual contact page:
    //whether it passes/works properly depends on if browser is defined outside or not,
    //whether there is a before or a before each inside and if the test has been run
    //on the same ID more than once in a row.

})
