const {
    getAllTenants,
    addTenant
} = require('./handlers/tenants');

const functions = require('firebase-functions');

const express = require('express');
const app = express();

app.get('/tenants', getAllTenants);
app.post('/tenants', addTenant);

exports.api = functions.region('asia-east2').https.onRequest(app);