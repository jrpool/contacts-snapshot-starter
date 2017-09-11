const {execSync} = require('child_process');
const chai = require('chai')
  , chaiHttp = require('chai-http');
const expect = require ('chai').expect

chai.use(chaiHttp);


describe('homepage route', function(){
  beforeEach(function() {
    execSync('npm run load_contacts')
  })
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
