const literal = require('./grammar/literal.js')
const expr = require('./grammar/expr.js')
const type = require('./grammar/type.js')
const coercion = require('./grammar/coercion.js')
const bind = require('./grammar/bind.js')
const pat = require('./grammar/pat.js')
const idinfo = require('./grammar/idinfo.js')

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
        ...idinfo,
    },
    precedences: _ => [
        ['fun-type', 'type'],
        ['app-co', 'co'],
    ],
    conflicts: $ => [
        [$._type1, $._type_app],
        [$._type_app],
        [$.coercion, $._co_app],
        [$._co_app],
    ],
})
