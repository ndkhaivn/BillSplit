const { db } = require('../utilities/admin');
const { validate } = require('../utilities/validators');
const { check } = require('express-validator');
const config = require('../config');
const moment = require('moment');

const reduceTenantDetails = (data) => {
    let tenantDetails = {
        tenantName: data.tenantName.trim(),
        stays: data.stays
    };
    return tenantDetails;
};

exports.validate = (method) => {
    switch (method) {
        case 'addTenant':
        case 'editTenant': {
            return [
                check('tenantName').notEmpty().withMessage('Tenant name must not be empty')
                    .matches(/^[a-zA-Z0-9 ]+$/i).withMessage('Must be a valid name'),
                check('stays').custom(stays => {
                    for (let stay of stays) {
                        if (!moment(stay.fromDate, config.date_format, true).isValid()) {
                            throw new Error(`Date format not valid. Expect ${config.date_format}`);
                        }
                        if (stay.toDate && !moment(stay.toDate, config.date_format, true).isValid()) {
                            throw new Error(`Date format not valid. Expect ${config.date_format}`);
                        }
                    }
                    return true;
                })
            ]
        }
    }
    return [];
};


exports.getAllTenants = (request, response) => {
    db.collection('tenants')
        .get()
        .then((data) => {
            let tenants = [];
            data.forEach((doc) => {
                tenants.push({
                    tenantId: doc.id,
                    tenantName: doc.data().tenantName,
                    stays: doc.data().stays,
                });
            });
            return response.json(tenants);
        })
        .catch((err) => {
            response.status(500).json({ error: err.code });
            console.log(err.code);
        });
};

exports.addTenant = (request, response) => {

    const result = validate(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
        response.status(400).json({ errors });
        return;
    }

    const newTenant = reduceTenantDetails(request.body);

    db.collection('tenants')
        .add(newTenant)
        .then((doc) => {
            return response.json({ tenantId: doc.id });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not add tenant` });
            console.log(err);
        })
};

exports.getTenant = (request, response) => {
    let tenantData = {};
    db.doc(`/tenants/${request.params.tenantId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Tenant #${request.params.tenantId} not found!`});
            }
            tenantData = doc.data();
            tenantData.tenantId = doc.id;
            return response.json(tenantData);
        })
        .catch((err) => {
            response.status(500).json({ error: err });
            console.log(err);
        });
};

exports.editTenant = (request, response) => {

    const result = validate(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
        response.status(400).json({ errors });
        return;
    }

    db.doc(`/tenants/${request.params.tenantId}`)
        .update(reduceTenantDetails(request.body))
        .then((doc) => {
            return response.json({ message: `document updated successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not edit tenant` });
            console.log(err);
        })
};

exports.deleteTenant = (request, response) => {
    const document = db.doc(`/tenants/${request.params.tenantId}`);
    let deletedTenant = { tenantId: document.id };
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Tenant #${doc.id} not found!` });
            } else {
                Object.assign(deletedTenant, doc.data());
                return document.delete();
            }
        })
        .then(() => {
            return response.json(deletedTenant);
        })
        .catch((err) => {
            response.status(500).json({ error: `could not delete tenant` });
            console.log(err);
        })
};