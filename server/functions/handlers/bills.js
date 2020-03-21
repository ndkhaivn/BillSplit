const { db } = require('../utilities/admin');
const { validate } = require('../utilities/validators');
const { check } = require('express-validator');
const config = require('../config');
const moment = require('moment');

const sanitizeBillDetails = (data) => {
    let billDetails = {
        billTypeId: data.billTypeId,
        amount: Number(data.amount),
        paymentDate: data.paymentDate,
        period: parseInt(data.period),
        split: data.split.map((split) => {
            return {
                tenantId: split.tenantId,
                days: parseInt(split.days),
                sharedAmount: Number(split.sharedAmount)
            }
        }),
    };
    return billDetails;
};

exports.validate = (method) => {
    switch (method) {
        case 'addBill':
        case 'editBill': {
            return [
                check('amount', 'Not a valid amount').isDecimal()
                    .custom(amount => {
                        return Number(amount) > 0;
                    }),
                check('paymentDate').custom(date => {
                    if (!moment(date, config.date_format, true).isValid()) {
                        throw new Error(`Date format not valid. Expect ${config.date_format}`);
                    }
                    return true;
                }),
                check('period').custom(period => {
                    if (!moment(period.fromDate, config.date_format, true).isValid()) {
                        throw new Error(`Date format not valid. Expect ${config.date_format}`);
                    }
                    if (!moment(period.toDate, config.date_format, true).isValid()) {
                        throw new Error(`Date format not valid. Expect ${config.date_format}`);
                    }
                    return true;
                }),
                check('split.*.sharedAmount', 'Not a valid amount').isDecimal()
                    .custom(amount => {
                        return Number(amount) > 0
                    }),
                check('split.*.days').isNumeric().withMessage('Not a valid number'),
            ]
        }
    }
    return [];
};

exports.getAllBills = (request, response) => {
    db.collection('bills')
        .get()
        .then((data) => {
            let bills = [];
            data.forEach((doc) => {
                bills.push({
                    billId: doc.id,
                    billTypeId: doc.data().billTypeId,
                    amount: doc.data().amount,
                    paymentDate: doc.data().paymentDate,
                    period: doc.data().period,
                    split: doc.data().split,
                });
            });
            return response.json(bills);
        })
        .catch((err) => {
            response.status(500).json({ error: err.code });
            console.log(err.code);
        });
};

exports.addBill = (request, response) => {

    const result = validate(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
        response.status(400).json({ errors });
        return;
    }

    const newBill = sanitizeBillDetails(request.body);

    db.collection('bills')
        .add(newBill)
        .then((doc) => {
            return response.json({ message: `document ${doc.id} created successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not add bill` });
            console.log(err);
        })
};

exports.getBill = (request, response) => {
    let billData = {};
    db.doc(`/bills/${request.params.billId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Bill #${request.params.billId} not found!`});
            }
            billData = doc.data();
            billData.billId = doc.id;
            return response.json(billData);
        })
        .catch((err) => {
            response.status(500).json({ error: err });
            console.log(err);
        });
};

exports.editBill = (request, response) => {

    const result = validate(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
        response.status(400).json({ errors });
        return;
    }

    db.doc(`/bills/${request.params.billId}`)
        .update(sanitizeBillDetails(request.body))
        .then((doc) => {
            return response.json({ message: `document updated successfully` });
        })
        .catch((err) => {
            response.status(500).json({ error: `could not edit bill` });
            console.log(err);
        })
};

exports.deleteBill = (request, response) => {
    const document = db.doc(`/bills/${request.params.billId}`);
    let deletedBill = { billId: document.id };
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: `Bill #${doc.id} not found!` });
            } else {
                Object.assign(deletedBill, doc.data());
                return document.delete();
            }
        })
        .then(() => {
            return response.json(deletedBill);
        })
        .catch((err) => {
            response.status(500).json({ error: `could not delete bill` });
            console.log(err);
        })
};