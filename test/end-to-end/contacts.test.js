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

    it('has status 200', function(done) { // <= Pass in done callback
      chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();                               // <= Call done to signal callback end
      });
    });
    it('renders index.ejs', function(done) {
      chai.request('http://localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(res.text).to.include('Jared');
        expect(res.text).to.include('Tanner');
        done();                               // <= Call done to signal callback end
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

})
