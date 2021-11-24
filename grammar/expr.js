const
qualified = ($, rule) => choice(
    seq($.module_name, '.', rule),
    rule
)
const {parens, braces, sep1} = require('./util.js')

module.exports = {
  varid: _ => /[_a-z\$](\w|'|\$)*#?/,
  varty: $ => /[_a-z\$](\w|'|\$)*#?/,
  module_name: _ => /[A-Z](\w|\.)/,
  con_nm: _ => /[A-Z](\w)*/,
  con: $ => qualified($, $.con_nm),
  variable: $ => qualified($, $.varid),

  expr_case: $ => seq(
      'case',
      $.expr,
      'of',
      braces(repeat($.case_alt)),
  ),

  case_alt: $ => seq(
      choice($.default_pat, $.pat),
      '->',
      braces($.expr),
  ),

  default_pat: _ => '__DEFAULT',

  expr_let: $ => seq(
      'let',
      braces($.binding),
      'in',
      $.expr,
  ),

  expr_cast: $ => seq(
      $.expr,
      $.coercion
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

  type_lambda_bndr: $ => seq(
      '@',
      parens($.varty),
  ),

  expr_lambda: $ => seq(
      '\\',
      repeat1($._lambda_bndr),
      '->',
      $.expr,
  ),

  expr_parens: $ => parens($._aexpr),

  _aexpr: $ => choice(
    $.expr_parens,
    $.expr_lambda,
    $.literal,
    $.variable,
    $.expr_case,
    $.expr_let,
    $.expr_cast,
  ),

  _value_arg: $ => $.expr,

  _type_arg: $ => seq('@', $.type),

  _app_arg: $ => choice($._type_arg, $._value_arg),

  fun_app: $ => prec.left(
      seq($._aexpr, repeat1($._app_arg))
  ),

  expr: $ => prec.left(choice(
      $._aexpr,
      $.fun_app,
  )),
}
