const chai = require('chai')
  , chaiHttp = require('chai-http');
const expect = require ('chai').expect

chai.use(chaiHttp);

describe('homepage route', function(){
  it('has status 200', function(done) { // <= Pass in done callback
    chai.request('http://localhost:3000')
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();                               // <= Call done to signal callback end
    });
  });  
})
