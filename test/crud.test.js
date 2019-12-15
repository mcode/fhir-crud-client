const nock = require('nock');
const { FHIRClient } = require('../');
const examplePatient = require('./fixtures/patient.json');

const BASE_URL = 'http://example.com';
const client = new FHIRClient(BASE_URL);

test('test simple gets', async () => {
  nock(BASE_URL)
    .persist()
    .get('/Patient/98')
    .reply(200, examplePatient);

  await client.read('Patient/98');
  await client.read({ resourceType: 'Patient', id: '98' });
});

test('test invalid gets', async () => {
  nock(BASE_URL)
    .persist()
    .get('/Patient/98')
    .reply(200, examplePatient);

  // Integer is not a valid arugment to read
  await expect(client.read(98)).rejects.toThrow();

  // Missing resourceType
  await expect(client.read({ id: '98' })).rejects.toThrow();

  // Missing id
  await expect(client.read({ resourceType: 'Patient' })).rejects.toThrow();
});
