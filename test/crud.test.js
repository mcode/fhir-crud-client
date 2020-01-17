const nock = require('nock');
const { FHIRClient } = require('../');
const examplePatient = require('./fixtures/patient.json');
const exampleSearchset = require('./fixtures/searchset.json');

const BASE_URL = 'http://example.com';
const client = new FHIRClient(BASE_URL);

test('test simple gets', async () => {
  nock(BASE_URL)
    .get(`/Patient/${examplePatient.id}`)
    .reply(200, examplePatient);

  const patient = await client.read({ resourceType: 'Patient', id: `${examplePatient.id}` });
  expect(patient.resourceType).toEqual('Patient');
  expect(patient).toEqual(examplePatient);
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

  const patient = await client.create({ resourceType: 'Patient', body: examplePatient });
  expect(patient.resourceType).toEqual('Patient');
  expect(patient).toEqual(examplePatient);
});

test('test invalid creation params', async () => {
  await expect(client.create({ resourceType: 'Patient' })).rejects.toThrow();
  await expect(client.create({ body: examplePatient })).rejects.toThrow();
});

test('test updating resource', async () => {
  const modifiedPatient = { ...examplePatient };
  modifiedPatient.name = [{
    family: 'NewName',
    given: ['NewName'],
  }];

  nock(BASE_URL)
    .put(`/Patient/${examplePatient.id}`, modifiedPatient)
    .reply(200, modifiedPatient);

  const newPatient = await client.update({ resourceType: 'Patient', id: examplePatient.id, body: modifiedPatient });
  expect(newPatient).toEqual(modifiedPatient);
});

test('test search', async () => {
  nock(BASE_URL)
    .get('/Patient?family=test&given=test')
    .reply(200, exampleSearchset);

  const searchResult = await client.search({ resourceType: 'Patient', params: { family: 'test', given: 'test' } });
  expect(searchResult).toEqual(exampleSearchset);
});
