const {brackets} = require('./util.js')

module.exports = {
    tysig: $ => seq(
        $.variable,
        '::',
        $.type,
    ),

    binding: $ => seq(
        optional($.tysig),
        optional($.idinfo),
        seq($.variable, '=', $.expr),
    ),
}
