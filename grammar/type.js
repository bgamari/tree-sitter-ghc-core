const {parens, braces, sep1} = require('./util.js')

module.exports = {
    tycon: $ => $.con,

    type_parens: $ => parens($.type),

    type_forall: $ => seq(
        'forall',
        repeat1($.varty),
        '.',
        $.type
    ),

    _atype: $ => choice(
        $.varty,
        $.tycon,
        $.literal,
        $.type_forall,
        $.type_parens,
    ),

    type_app: $ => prec.left(
        seq($._atype, repeat1($.type))
    ),

    type: $ => prec.left(choice(
        $._atype,
        $.type_app,
    )),
}

