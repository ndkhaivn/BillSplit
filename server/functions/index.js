const tenantController = require('./handlers/tenants');
const billTypeController = require('./handlers/billTypes');
const billController = require('./handlers/bills');

const functions = require('firebase-functions');

const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/tenants', tenantController.getAllTenants);
app.get('/tenant/:tenantId', tenantController.getTenant);
app.post('/tenants', tenantController.validate('addTenant'), tenantController.addTenant);
app.post('/tenant/:tenantId', tenantController.validate('editTenant'), tenantController.editTenant);
app.delete('/tenant/:tenantId', tenantController.deleteTenant);

app.get('/bill-types', billTypeController.getAllBillTypes);
app.get('/bill-type/:billTypeId', billTypeController.getBillType);
app.post('/bill-types', billTypeController.addBillType);
app.post('/bill-type/:billTypeId', billTypeController.editBillType);
app.delete('/bill-type/:billTypeId', billTypeController.deleteBillType);

app.get('/bills', billController.getAllBills);
app.get('/bill/:billId', billController.getBill);
app.post('/bills', billController.validate('addBill'), billController.addBill);
app.post('/bill/:billId', billController.validate('editBill'), billController.editBill);
app.delete('/bill/:billId', billController.deleteBill);

exports.api = functions.region('asia-east2').https.onRequest(app);