const
qualified = ($, rule) => seq($._qualifying_module, rule)
mb_qualified = ($, rule) => choice(
    rule,
    qualified($, rule),
)

const {parens, braces, sep1} = require('./util.js')

module.exports = {
  varid: _ => /[_a-z\$][\w_\$]*#?/,
  varty: _ => /[_a-z\$][\w_\$]*#?/,
  // This is a bit of a lie but meh
  _modid: _ => /[A-Z](\w|_)+\./,
  _qualifying_module: $ => repeat1($._modid),
  conid: _ => choice(
      /[A-Z](\w|')*#?/,
      '()',
  ),
  datacon: $ => seq(
      optional($._qualifying_module),
      $.conid,
  ),
  variable: $ => mb_qualified($, $.varid),

  expr_case: $ => seq(
      'case',
      field('scrutinee', $.expr),
      'of',
      field('case_bndr', optional($.varid)),
      field('alts', braces(repeat($.case_alt))),
  ),

  case_alt: $ => seq(
      choice($.default_pat, $.pat),
      '->',
      $.expr,
  ),

  default_pat: _ => '__DEFAULT',

  expr_let: $ => seq(
      'let',
      braces($.binding),
      'in',
      $.expr,
  ),

  _app: $ => seq(
      $.expr,
  ),

  lambda_wildcard: $ => seq('_', optional($.idinfo)),

  _lambda_bndr: $ => choice(
      $.lambda_wildcard,
      $.value_lambda_bndr,
      $.type_lambda_bndr
  ),

  value_lambda_bndr: $ => parens(seq(
      $.varid,
      optional($.idinfo),
      '::',
      $.type,
  )),

  type_lambda_bndr: $ => parens(seq(
      '@',
      $.varty,
  )),

  expr_lambda: $ => seq(
      '\\',
      repeat1($._lambda_bndr),
      '->',
      $.expr,
  ),

  expr_parens: $ => parens($._expr1),

  _expr4: $ => choice(
    $.expr_parens,
    $.literal,
    seq(
        optional($._qualifying_module),
        choice($.varid, $.conid),
    ),
  ),

  _type_arg: $ => seq('@', $._type2),
  _co_arg: $ => seq('@~', $._coercion2),
  _app_arg: $ => prec(2, choice($._type_arg, $._expr3)),
  _fun_app: $ => seq($._expr4, repeat1($._app_arg)),

  _expr3: $ => choice(
      $._expr4,
      $._fun_app,
  ),

  _expr2: $ => choice(
    $.expr_lambda,
    $.expr_case,
    $.expr_let,
    $._expr3,
  ),

  expr_cast: $ => seq(
      $._expr4,
      '`cast`',
      $.coercion_and_kind,
  ),

  _expr1: $ => choice(
      $.expr_cast,
      $._expr2,
  ),

  expr: $ => prec.right($._expr1),
}
