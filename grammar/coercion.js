const {parens, angle_brackets} = require('./util.js')

module.exports = {
    co_var: $ => $.varid,

    co_refl: $ => seq(angle_brackets($.type), $.role),

    co_sym: $ => seq('Sym', $._coercion1),

    role: _ => seq('_', choice('R', 'N', 'P')),

    co_axiom: $ => seq(
        $.tycon,
        optional(/:[\w\d]+/),
        brackets(/[0-9]+/)
    ),

    eq_rel: $ => choice(
        '~R#',
        '~N#',
    ),

    co_parens: $ => parens($.coercion),

    _coercion2: $ => choice(
        $.co_sym,
        $.co_refl,
        $.co_axiom,
        $.co_parens,
    ),

    _co_app: $ => prec.left('app-co', seq($._coercion2, repeat1($._coercion1))),

    _coercion1: $ => prec('co', choice(
        $._co_app,
        $._coercion2
    )),

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

    coercion: $ => $._coercion1,
}
