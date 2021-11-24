const {brackets} = require('./util.js')

module.exports = {
    tysig: $ => seq(
        $.varid,
        '::',
        $.type
    ),

    binding: $ => seq(
        optional($.tysig),
        optional($.idinfo),
        seq($.variable, '=', $.expr),
    ),
}
