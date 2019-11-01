# felicity
Felicity provides testing support for [Joi](https://www.github.com/hapijs/joi) by leveraging your Joi schema to generate randomized data directly. This can be used for database seeding or fuzz testing.

[![npm version](https://badge.fury.io/js/felicity.svg)](https://badge.fury.io/js/felicity)
[![Build Status](https://travis-ci.org/xogroup/felicity.svg?branch=master)](https://travis-ci.org/xogroup/felicity)

Lead Maintainer: [Wes Tyler](https://github.com/WesTyler)

## Introduction
> **fe·lic·i·ty** *noun* intense happiness; the ability to find appropriate expression for one's thoughts or intentions.

Felicity builds upon Joi by allowing easy sample data generation for documentation, tests, and more.

## Installation
```
npm install felicity
```

## Usage
Felicity can be used to randomly generate valid examples directly from a Joi schema:
```Javascript
const stringSchema = Joi.string().regex(/[a-c]{3}-[d-f]{3}-[0-9]{4}/);
const sampleString = Felicity.example(stringSchema);
// sampleString === 'caa-eff-5144'

const objectSchema = Joi.object().keys({
    id      : Joi.string().guid(),
    username: Joi.string().min(6).alphanum(),
    numbers : Joi.array().items(Joi.number().min(1))
});
const sampleObject = Felicity.example(objectSchema);
/*
sampleObject
{
    id: '0e740417-1708-4035-a495-6bccce560583',
    username: '4dKp2lHj',
    numbers: [ 1.0849635479971766 ]
}
*/
```

## Contributing

We love community and contributions! Please check out our [guidelines](https://github.com/xogroup/felicity/blob/master/.github/CONTRIBUTING.md) before making any PRs.

## Setting up for development

Getting yourself setup and bootstrapped is easy.  Use the following commands after you clone down.

```
npm install && npm test
```

## Joi features not yet supported

Some Joi schema options are not yet fully supported. Most unsupported features should not cause errors, but may be disregarded by Felicity or may result in behavior other than that documented in the Joi api.

A feature is considered Felicity-supported when it is explicitly covered in tests on both `entityFor` (and associated instance methods) and `example`.

- Function
  - `ref`
- Array
  - `unique`
- Object
  - `requiredKeys`
  - `optionalKeys`
