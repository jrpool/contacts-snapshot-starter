const {execSync} = require('child_process');
const Browser = require('zombie');
const url = 'http://localhost:3000'
let browser;

//ALL BUT 3rd TEST in 6th GROUP WORK WHEN ALL TESTS RUN. SOME DON'T WORK PROPERLY IN .only:
context.only('UI tests', function() {
  beforeEach(function(done) {
    execSync('npm run load_schema && npm run load_contacts');
    done();
  })

//WORKS PROPERLY:
  describe('1) GET /contacts/new', function() {
    before(function(done) {
      browser = new Browser();
      browser.visit(url + '/contacts/new', done);
    });
      it('GET to /contacts/new gets new-contact form', function() {
        browser.assert.element('form[class=new-contact-form]');
      })
  })

//WORKS PROPERLY:
  describe('2) POST /contacts/new', function() {
    before(function(done) {
      browser = new Browser();
      browser.visit(url + '/contacts/new', done);
    });
    before(function(done) {
      browser
      .fill('first_name', 'Rhonda')
      .fill('last_name', 'Smith')
      .pressButton('Add Contact', done);
    });
      it('POST of /contacts/new gets contact-detail page', function() {
        browser.assert.text('h1', 'Rhonda Smith');
      });
    })

//WORKS PROPERLY:
    describe('3) GET /', function() {
      before(function(done) {
        browser = new Browser();
        browser.visit(url, done);
      });
      it('GET to / gets contact-list page', function() {
        browser.assert.elements('.contact-list-member', 3);
        browser.assert.elements('.delete-contact', 3);
      })
    })

//WORKS PROPERLY in .only. NOT WORKING when all UI tests run (does not delete first contact)
    describe('4) yes deletion of contact from home page', function() {
      beforeEach(function(done) {
        browser = new Browser();
        browser.visit(url, done);
      });
      beforeEach(function() {
        browser.on('confirm', function() {
          console.log('Confirming deletion')
          return true
        })
      });
      it('presses delete button', function() {
        browser.pressButton('.delete-contact')
      });
      it('actually deletes one of the three contacts', function() {
        browser.assert.elements('.contact-list-member', 2);
        browser.assert.elements('.delete-contact', 2);
      });
      //this one keeps passing no matter what and the actual deletion is happening
      // curl -X DELETE http://localhost:3000/contacts/3 deletes 3.
      // Browser suppresses it unless confirmed.
    });

//NOT WORKING IN .only, WORKING when all UI tests are run:
    describe('5) no deletion of contact from home page', function() {
      beforeEach(function(done) {
        browser = new Browser();
        browser.visit(url, done);
      });
      beforeEach(function() {
        browser.on('confirm', function() {
          console.log('Confirming deletion')
          return false
        })
      });
      it('thought about deleting the first contact', function() {
        browser.pressButton('.delete-contact')
      });
      it('returned to home page after not deleting a contact', function() {
        browser.assert.elements('.contact-list-member', 3);
        browser.assert.elements('.delete-contact', 3);
      });
      //this one keeps passing no matter what and the actual deletion is happening
      // curl -X DELETE http://localhost:3000/contacts/3 deletes 3.
      // Browser suppresses it unless confirmed.
    });

//NOT WORKING (see notes on third test):
    describe('6) deleting from individual contact page', function() {
      beforeEach(function(done) {
        browser = new Browser();
        browser.visit(url + '/contacts/1', done);
      });
      beforeEach(function() {
        browser.on('confirm', function() {
          console.log('Confirming deletion')
          return true
        })
      });
      it('reached Jared Grippe\'s page', function() {
        browser.assert.text('h1', 'Jared Grippe')
      })
      it('deleted Jared Grippe\'s page', function() {
        browser.pressButton('.delete-contact')
      })
      it('gets a 404 after deleting Jared Grippe\'s page', function() {
        //this gives "Error: Server returned status code 404" but fails test:
          browser.assert.status(404)
        //this passes the test, though I expect it to fail:
          browser.assert.text('h1', 'Jared Grippe')
      })
    });

//NOT WORKING in .only (seems to delete contact)
    describe('7) changed mind about deleting from individual contact page', function() {
      beforeEach(function(done) {
        browser = new Browser();
        browser.visit(url + '/contacts/2', done);
      });
      beforeEach(function() {
        browser.on('confirm', function() {
          console.log('Confirming deletion')
          return false
        })
      });
      it('reached Tanner Welsh\'s page', function() {
        browser.assert.text('h1', 'Tanner Welsh')
      })
      it('deleted Tanner Welsh\'s page', function() {
        browser.pressButton('.delete-contact')
      })
      it('goes back to Tanner Welsh\'s page', function() {
        browser.assert.text('h1', 'Tanner Welsh')
      })
    });
    //individual contact page:
    //whether it passes/works properly depends on if browser is defined outside or not,
    //whether there is a before or a before each inside and if the test has been run
    //on the same ID more than once in a row.

})
