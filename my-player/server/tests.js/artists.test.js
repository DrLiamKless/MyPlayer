const request = require('supertest');
const app = require('../app');
const { Artist } = require('../models');
const artistMock = [{artistName: 'Liam'}, {artistame: 'Rita'}, {artistName: 'Sarit Hadad'}]

describe('testing artists endpoints', () => {

  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it('get all artist', async (done) => {
    await Artist.bulkCreate(artistMock)
    const { body } = await request(app).get('/artists');
    console.log('all artists:', body);
    expect(body.length).toBe(3)
    done()
  })


  it('Can create artist', async (done) => {
    const { body } = await request(app).post('/artists/add').send({artistName: 'Liran'});
    expect(body.artistName).toBe('Liran')
    done()
  })
})