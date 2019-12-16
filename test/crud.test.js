const nock = require('nock');
const { FHIRClient } = require('../');
const examplePatient = require('./fixtures/patient.json');

const BASE_URL = 'http://example.com';
const client = new FHIRClient(BASE_URL);

test('test simple gets', async () => {
  nock(BASE_URL)
    .get('/Patient/98')
    .reply(200, examplePatient);

  await client.read({ resourceType: 'Patient', id: '98' });
});

test('test invalid gets', async () => {
  // Integer is not a valid arugment to read
  await expect(client.read(98)).rejects.toThrow();

  // Missing resourceType
  await expect(client.read({ id: '98' })).rejects.toThrow();

  // Missing id
  await expect(client.read({ resourceType: 'Patient' })).rejects.toThrow();
});

test('test simple creation', async () => {
  nock(BASE_URL)
    .post('/Patient', examplePatient)
    .reply(201, examplePatient);

  await client.create({ resourceType: 'Patient', body: examplePatient });
});

test('test invalid creation params', async () => {
  await expect(client.create({ resourceType: 'Patient' })).rejects.toThrow();
  await expect(client.create({ body: examplePatient })).rejects.toThrow();
});
