const {brackets} = require('./util.js')

module.exports = {
    idinfo: $ => brackets(sep1(',', $.idinfo_item)),

    idinfo_item: $ => choice(
        'LclId',
        seq('GblId', brackets(/[^\]]/)),
        seq('Str=', $.strictness_sig),
        seq('Caf=NoCafRefs'),
        seq('Arity=', $.arity),
        seq('Cpr=', $.cpr_sig),
        seq('Unf=', $.unfolding),
        seq('Occ=', /[^,\]]+/),
        seq('OS=OneShot'),
        seq('InlPrag=', $.inline_pragma),
    ),

    inline_pragma: _ => choice(
        seq('INLINE', brackets(choice('final', /[\d]+/)), optional('CONLIKE')),
        seq('NOINLINE'),
    ),

    arity: _ => /[\d]+/,

    strictness_sig: $ => 'TODO',
    cpr_sig: $ => 'TODO',

    unfolding: $ => seq('Utf', brackets(
        sep1(',', $.unfolding_item),
    )),

    bool: _ => choice('False', 'True'),

    unfolding_item: $ => choice(
        seq('Src=', /[\w]+/),
        seq('TopLvl=', $.bool),
        seq('Value=', $.bool),
        seq('ConLike=', $.bool),
        seq('WorkFree=', $.bool),
        seq('Expandable=', $.bool),
        seq('Guidance=', $.unfolding_guidance),
        seq('Tmpl=', $.expr),
    ),

    unfolding_guidance: $ => 'TODO',
}
