const {execSync} = require('child_process');
const expect = require('chai').expect
const query = require(process.cwd() + '/src/models/contacts.js')


context('integration tests', function() {
  beforeEach(function() {
    execSync('npm run load_schema && npm run load_contacts')
  })

  describe(`findAll`, () => {
    it(`should return 3 rows`, () => {
      return query.findAll()
      .then(data => {
        expect(data).to.have.lengthOf(3)
      })
    })
    it(`first row should have first name Jared`, () => {
      return query.findAll()
      .then(data => {
        expect(data[0].first_name).to.equal('Jared')
      })
    })
  })

  describe(`findById`, () => {
    it(`findById(1) should return Jared's info`, () => {
      return query.findById(1)
      .then(data => {
        expect(data.last_name).to.equal('Grippe')
      })
    })
  })

  describe(`search`, () => {
    it(`search(Ja) should return two rows`, () => {
      return query.search('Ja')
      .then(data => {
        expect(data).to.have.lengthOf(2)
      })
    })
  })

  describe(`create`, () => {
    it.only(`create({first_name: 'Jonathan', last_name: 'Pool'}) should return an object with Id 4`, () => {
      return query.create({first_name: 'Jonathan', last_name: 'Pool'})
      .then(data => {
        expect(data[0].id).to.equal(4)
      })
    })
  })

})
