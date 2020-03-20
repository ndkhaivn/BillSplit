const tenantController = require('./handlers/tenants');

const functions = require('firebase-functions');

const express = require('express');
const app = express();

app.get('/tenants', tenantController.getAllTenants);
app.get('/tenant/:tenantId', tenantController.getTenant);
app.post('/tenants', tenantController.validate('addTenant'), tenantController.addTenant);
app.post('/tenant/:tenantId', tenantController.validate('editTenant'), tenantController.editTenant);
app.delete('/tenant/:tenantId', tenantController.deleteTenant);

exports.api = functions.region('asia-east2').https.onRequest(app);