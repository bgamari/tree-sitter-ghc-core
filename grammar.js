const literal = require('./grammar/literal.js')
const expr = require('./grammar/expr.js')
const type = require('./grammar/type.js')
const coercion = require('./grammar/coercion.js')
const bind = require('./grammar/bind.js')
const pat = require('./grammar/pat.js')

module.exports = grammar({
    name: 'ghccore',
    rules: {
        source_file: $ => $.binding,

        ...literal,
        ...expr,
        ...type,
        ...coercion,
        ...bind,
        ...pat,
    },
})
