const {parens, angle_brackets} = require('./util.js')

module.exports = {
    co_var: $ => $.varid,

    co_refl: $ => seq(angle_brackets($.tycon), $.role),

    co_sym: $ => seq('Sym', $.coercion),

    role: _ => seq('_', choice('R', 'N', 'P')),

    axiom: $ => seq($.tycon, brackets(/[0-9]+/)),

    eq_rel: $ => choice(
        '~R#',
        '~N#',
    ),

    coercion_kind: $ => seq(
        $.type,
        $.eq_rel,
        $.type
    ),

    coercion_and_kind: $ => parens(seq(
        $.coercion,
        '::',
        $.coercion_kind,
    )),

    _coercion2: $ => choice(
        $.co_sym,
        $.co_refl,
    ),

    _co_app: $ => prec.left('app-co', seq($._coercion1, repeat1($.coercion))),

    _coercion1: $ => prec('co', choice(
        $._co_app,
        $._coercion2
    )),

    coercion: $ => $._coercion1,
}
