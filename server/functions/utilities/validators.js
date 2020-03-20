const { validationResult } = require('express-validator');

const validate = validationResult.withDefaults({
    formatter: (error) => {
        return error.msg

    }
});

module.exports = { validate };