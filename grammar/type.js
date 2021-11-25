const {parens, braces, sep1} = require('./util.js')

module.exports = {
    tycon: $ => choice(
        '()',
        '*',
        $.datacon,
    ),

    ticked_datacon: $ => seq("'", $.datacon),

    type_parens: $ => parens($.type),

    type_forall: $ => seq(
        'forall',
        repeat1($.varty),
        '.',
        $.type
    ),

    _type2: $ => choice(
        $.varty,
        $.tycon,
        $.ticked_datacon,
        $.literal,
        $.type_parens,
    ),

    _type_app: $ => seq($._type2, repeat1($._type2)),

    _type1: $ => choice(
        $._type2,
        $._type_app,
    ),

    context: $ => 'todo',

    fun_type: $ => prec('fun-type', seq(
        $._type1,
        '->',
        $.type
    )),

    type: $ => prec.left('type', choice(
        $.type_forall,
        $.context,
        $.fun_type,
        $._type1,
    )),
}

