const {brackets} = require('./util.js')

module.exports = {
    tysig: $ => seq(
        $.varid,
        '::',
        $.type
    ),

    idinfo: $ => brackets(seq(',', $.idinfo_item)),
    idinfo_item: $ => choice(),

    binding: $ => seq(
        optional($.tysig),
        optional($.idinfo),
        seq($.variable, '=', $.expr),
    ),
}
