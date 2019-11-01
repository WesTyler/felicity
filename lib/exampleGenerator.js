'use strict';

const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');
const ValueGenerator = require('./valueGenerator');

const exampleGenerator = function (schema, options) {

    const exampleResult = ValueGenerator(schema, options);

    if (Hoek.reach(options, 'config.strictExample')) {
        const validationResult = Joi.validate(exampleResult, schema, {
            abortEarly: false
        });

        if (validationResult.error) {
            throw validationResult.error;
        }
    }

    return exampleResult;
};

module.exports = exampleGenerator;
