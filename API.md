# 6.0.0 API Reference

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Felicity](#felicity)
  - [`example(schema, [options])`](#exampleschema-options)
  - [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
  
## Felicity

### `example(schema, [options])`

Returns a valid pseudo-randomly generated example Javascript Object based on the provided Joi schema.

Accepts an optional [`[options]`](#example-options) parameter.

```Javascript
const schema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    id  : Joi.string().guid().required(),
    tags: Joi.array().items(Joi.string().max(4)).min(2).required(),
});
const exampleDoc = Felicity.example(schema);

/*
exampleDoc
{ 
    name: 'qgrbddv',
    id  : '6928f0c0-68fa-4b6f-9bc5-961db17d42b0',
    tags: [ 'k2a', '31' ]
}
*/
```

### Options

All options parameters must be an object with property `config`. Properties on the `config` object are detailed by method below.

- `strictExample` - default `false`. Default behavior is to not run examples through Joi validation before returning.

If set to `true`, example will be validated prior to returning. 

Note: in most cases, there is no difference. The only known cases where this may result in no example coming back are with regex patterns containing lookarounds.

```Javascript
    const schema = Joi.object().keys({
        name    : Joi.string().regex(/abcd(?=efg)/)
    });

    const instance = Felicity.example(schema); // instance === { name: 'abcd' }

    const strictInstance = Felicity.example(schema, { config: { strictExample: true } }); // throws ValidationError
```

- `ignoreDefaults` - Default `false`. Default behavior is to stamp instances with default values.

If set to `true`, then default values of Joi properties with `.default('value')` set will not be stamped into instances but will be generated according to the Joi property rules.
```Javascript
    const schema = Joi.object().keys({
        name: Joi.string().required().default('felicity')
    });

    const example = Felicity.example(schema); // example === { name: 'felicity' }

    const noDefaultsExample = Felicity.example(schema, { config: { ignoreDefaults: true } }); // noDefaultsExample === { name: 'nq5yhu4ttq33di' }
```

- `ignoreValids` - Default `false`. Default behavior is to pick values from `.allow()`ed and `.valid()` sets.

If set to `true`, then the allowed/valid values will not be used but will be generated according to the Joi property rules.
```Javascript
    const schema = Joi.object().keys({
        name: Joi.string().allow(null).required()
    });

    const example = Felicity.example(schema); // example === { name: null }

    const noValidsExample = Felicity.example(schema, { config: { ignoreValids: true } }); // noValidsExample === { name: 'nq5yhu4ttq33di' }
```


- `includeOptional` - Default `false`. Default behavior is to ignore optional properties entirely.

If set to `true`, then Joi properties with `.optional()` set will be included on examples.
```Javascript
    const schema = Joi.object().keys({
        name    : Joi.string().required(),
        nickname: Joi.string().optional()
    });

    const instance = Felicity.example(schema); // instance === { name: 'ml9mmn0r8m7snhfr' }

    const withOptional = Felicity.example(schema, { config: { includeOptional: true } }); // withOptional === { name: '3cpffhgccgsw0zfr', nickname: '7pfjuxfa4gxk1emi' }
```
