const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/tenants', (request, response) => {
    admin
        .firestore()
        .collection('tenants')
        .get()
        .then((data) => {
            let tenants = [];
            data.forEach((doc) => {
                tenants.push(doc.data());
            });
            return response.json(tenants);
        })
        .catch((err) => {
            response.status(500).json({ error: err.code });
            console.log(err.code);
        });
});

app.post('/tenants', (request, response) => {

    const newTenant = {
        name: request.body.name,
        stays: request.body.stays
    };

    admin
        .firestore()
        .collection('tenants')
        .add(newTenant)
        .then((doc) => {
            return response.json({ message: `document ${doc.id} created successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not add tenant` });
            console.log(err);
        })
});

exports.api = functions.region('asia-east2').https.onRequest(app);