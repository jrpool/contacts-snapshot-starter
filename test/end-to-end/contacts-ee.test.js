const {execSync} = require('child_process');
const chai = require('chai')
  , chaiHttp = require('chai-http');
const expect = require ('chai').expect

chai.use(chaiHttp);

context('end to end tests', function(){
  beforeEach(function() {
    execSync('npm run load_schema && npm run load_contacts')
  })

  describe('homepage route', function(){

    it('has status 200', function(done) {
      chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('renders index.ejs', function(done) {
      chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res.text).to.include('Jared');
        expect(res.text).to.include('Tanner');
        done();
      });
    });
  })

  describe('new contact route', function(){
    it('renders the new contact form', function(done) {
      chai.request('http://localhost:3000')
      .get('/contacts/new')
      .end(function(err, res) {
        expect(res.text).to.include('First name:')
        done();
      })
    })
  })

  describe('individual contact route', function(){
    it('renders the correct page for an individual contact', function(done) {
      chai.request('http://localhost:3000')
      .get('/contacts/3')
      .end(function(err, res) {
        expect(res.text).to.include('James')
        done();
      })
    })
  })

  describe('individual contact deletion', function(){
    it('renders index.ejs', function(done) {
      chai.request('http://localhost:3000')
      .delete('/contacts/3')
      .end(function(err, res) {
        expect(res.text).to.not.include('James');
        expect(res.text).to.include('Jared');
        done();
      });
    });
  })

  describe('search contacts', function(){
    it('renders page with only matching names', function(done) {
      chai.request('http://localhost:3000')
      .get('/contacts/search')
      .query({q: 'Ja'})
      .end(function(err, res) {
        expect(res.text).to.include('Jared')
        expect(res.text).to.include('James')
        expect(res.text).to.not.include('Tanner')
        done()
      })
    })
  })

  describe('create new contact', function(){
    it('adds the specified contact and renders it on its own page', function(done) {
      chai.request('http://localhost:3000')
      .post('/contacts')
      .type('form')
      .send({
        'first_name': 'Rhonda',
        'last_name': 'Smith'
      })
      .end(function(err, res) {
        expect(res).to.redirectTo('http://localhost:3000/contacts/4');
        expect(res.text).to.include('Rhonda');
        expect(res.text).to.include('Smith');
        expect(res.text).to.not.include('Jared');
        done();
      })
    })
  })
})
