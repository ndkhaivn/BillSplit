const { db } = require('../utilities/admin');
const { validate } = require('../utilities/validators');
const { check } = require('express-validator');
const config = require('../config');

exports.getAllBillTypes = (request, response) => {
    db.collection('billTypes')
        .get()
        .then((data) => {
            let billTypes = [];
            data.forEach((doc) => {
                billTypes.push({
                    billTypeId: doc.id,
                    title: doc.data().title
                });
            });
            return response.json(billTypes);
        })
        .catch((err) => {
            response.status(500).json({ error: err.code });
            console.log(err.code);
        });
};

exports.addBillType = (request, response) => {

    const newBillType = request.body;

    db.collection('billTypes')
        .add(newBillType)
        .then((doc) => {
            return response.json({ message: `document ${doc.id} created successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not add bill type` });
            console.log(err);
        })
};

exports.getBillType = (request, response) => {
    let billTypeData = {};
    db.doc(`/billTypes/${request.params.billTypeId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Bill type #${request.params.billTypeId} not found!`});
            }
            billTypeData = doc.data();
            billTypeData.billTypeId = doc.id;
            return response.json(billTypeData);
        })
        .catch((err) => {
            response.status(500).json({ error: err });
            console.log(err);
        });
};

exports.editBillType = (request, response) => {

    db.doc(`/billTypes/${request.params.billTypeId}`)
        .update(request.body)
        .then((doc) => {
            return response.json({ message: `document updated successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not edit bill type` });
            console.log(err);
        })
};

exports.deleteBillType = (request, response) => {
    const document = db.doc(`/billTypes/${request.params.billTypeId}`);
    let deletedBillType = { billTypeId: document.id };
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Bill type #${doc.id} not found!` });
            } else {
                Object.assign(deletedBillType, doc.data());
                return document.delete();
            }
        })
        .then(() => {
            response.json(deletedBillType);
        })
        .catch((err) => {
            response.status(500).json({ error: `could not delete bill type` });
            console.log(err);
        })
};