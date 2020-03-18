const { db } = require('../utilities/admin');

exports.getAllTenants = (request, response) => {
    db.collection('tenants')
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
};

exports.addTenant = (request, response) => {
    const newTenant = {
        name: request.body.name,
        stays: request.body.stays
    };

    db.collection('tenants')
    .add(newTenant)
    .then((doc) => {
        return response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
        response.status(500).json({ error: `could not add tenant` });
        console.log(err);
    })
};