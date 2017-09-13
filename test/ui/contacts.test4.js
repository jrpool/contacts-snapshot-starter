const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'
let browser;

context.only('UI tests', function() {
  beforeEach(function(done) {
    execSync('npm run load_schema && npm run load_contacts');
    done();
  })

  describe('GET /contacts/new', function() {
    before(function(done) {
      browser = new Browser();
      browser.visit(url + '/contacts/new', done);
      console.log(
        '1: confirm has keys:\n'
        + Object.keys(browser.window.confirm).join('\n')
      );
    });
      it('GET to /contacts/new gets new-contact form', function() {
        browser.assert.element('form[class=new-contact-form]');
      }) // Pass and fail conditions behaving properly.
  })

  describe('POST /contacts/new', function() {
    before(function(done) {
      console.log('1st before');
      browser = new Browser();
      browser.visit(url + '/contacts/new', done);
    });
    before(function(done) {
      console.log('2nd before');
      browser
      .fill('first_name', 'Rhonda')
      .fill('last_name', 'Smith')
      .pressButton('Add Contact', done);
    });
      it('POST of /contacts/new gets contact-detail page', function() {
        browser.assert.text('h1', 'Rhonda Smith');
      });
    }) // Pass and fail conditions behaving properly.

    describe('GET /', function() {
      before(function(done) {
        browser = new Browser();
        browser.visit(url, done);
      });
      it('GET to / gets contact-list page', function() {
        browser.assert.elements('.contact-list-member', 3);
        browser.assert.elements('.delete-contact', 3);
      }) // Pass and fail conditions behaving properly.
    })

    describe('DELETE /', function() {
      before(function(done) {
        browser = new Browser();
        browser.visit(url, done);
      });
      before(function(done) {
        browser.pressButton('.delete-contact', done);
        console.log(
          '2: confirm has keys:\n'
          + Object.keys(browser.window.confirm).join('\n')
        );
      });
      it('1: DELETE on / gets modal confirm dialog', function(done) {
        console.log(
          '3: confirm has keys:\n'
          + Object.keys(browser.window.confirm).join('\n')
        );
        browser.on('confirm', function() {
          console.log('Confirmation dialog displayed.');
        });
        done();
        // browser.assert.elements('.delete-contact', 2);
      }); //this one keeps passing no matter what and the actual deletion is happening
      // curl -X DELETE http://localhost:3000/contacts/3 deletes 3.
      // Browser suppresses it unless confirmed.
    });

    describe('individual contact page', function() {
      before(function(done) {
        browser = new Browser();
        browser.visit(url + '/contacts/2', done);
      });
      it('2: should ask to confirm deletion', function() {
        browser.pressButton('.delete-contact', function() {
          browser.prompted('Are you unsure you want to delete this contact?')
        })
      })
    });
    //individual contact page:
    //whether it passes/works properly depends on if browser is defined outside or not,
    //whether there is a before or a before each inside and if the test has been run
    //on the same ID more than once in a row.

})
