# FHIR CRUD Client

A lightweight Promise-based JavaScript FHIR client for CRUD operations

* `read`
* `create`
* `update`
* `delete`
* `search`
* `transaction`

## Installation

``` bash
npm install --save fhir-crud-client
```

``` bash
yarn add fhir-crud-client
```

## Usage

``` JavaScript
const { FHIRClient } = require('fhir-crud-client');

const BASE_URL = 'http://your-server-url';
const HEADERS = {
  Accept: 'application/json',
};

const client = new FHIRClient(BASE_URL, HEADERS);
```

### read

``` JavaScript
// Read a resource

// With async/await
const resource = await client.read({ resourceType: 'Patient', id: 'my-patient' });
console.log(resource);

// With Promises
client.read({ resourceType: 'Patient', body: 'my-patient' })
  .then((resource) => {
    console.log(resource);
  });
```
### create

``` JavaScript
// Create a resource

// With async/await
const resource = await client.create({ resourceType: 'Patient', body: myPatientJson });
console.log(resource);

// With Promises
client.create({ resourceType: 'Patient', body: myPatientJson })
  .then((resource) => {
    console.log(resource);
  });
```

### update

``` JavaScript
// Update a resource

// With async/await
const resource = await client.update({ resourceType: 'Patient', id: 'my-patient', body: myModifiedPatient });
console.log(resource); // resource is the updated Patient

// With Promises
client.update({ resourceType: 'Patient', id: 'my-patient', body: myModifiedPatient })
  .then((resource) => {
    console.log(resource); // resource is the updated Patient
  });
```

### delete

``` JavaScript
// Delete a resource

// With async/await
const resource = await client.delete({ resourceType: 'Patient', id: 'my-patient' });
console.log(resource); // resource is an OperationOutcome

// With Promises
client.delete({ resourceType: 'Patient', id: 'my-patient' })
  .then((resource) => {
    console.log(resource); // resource is an OperationOutcome
  });
```

### search

``` JavaScript
// Search for resources

// With async/await
const bundle = await client.search({ resourceType: 'Patient', params: { family: 'test' } });
console.log(bundle);

// With Promises
client.search({ resourceType: 'Patient', params: { family: 'test' } })
  .then((bundle) => {
    console.log(bundle);
  });
```

### transaction

``` JavaScript
// Upload a transaction Bundle

// With async/await
const bundle = await client.transaction({ body: aTransactionBundle });
console.log(bundle);

// With Promises
client.search({ body: aTransactionBundle })
  .then((bundle) => {
    console.log(bundle);
  });
```
