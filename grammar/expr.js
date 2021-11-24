const
qualified = ($, rule) => choice(
    seq($.module_name, '.', rule),
    rule
)
const {parens, braces, sep1} = require('./util.js')

module.exports = {
  varid: _ => /[_a-z\$](\w|'|\$)*#?/,
  varty: $ => $.varid,
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
      $.expr
  ),

  expr_cast: $ => seq(
      $.expr,
      $.coercion
  ),

  _app: $ => seq(
      $.expr,
  ),

  _lambda_bndr: $ => choice(
      $.value_lambda_bndr,
      $.type_lambda_bndr
  ),

  value_lambda_bndr: $ => parens(seq(
      $.varid,
      '::',
      $.type
  )),

  type_lambda_bndr: $ => seq(
      '@',
      parens($.varty),
  ),

  expr_lambda: $ => seq(
      '\\',
      repeat1($._lambda_bndr),
      '->',
      $.expr
  ),

  _aexpr: $ => choice(
    parens($._aexpr),
    $.expr_lambda,
    $.literal,
    $.variable,
    $.expr_case,
    $.expr_let,
    $.expr_cast,
  ),

  expr: $ => choice(
      $._aexpr,
  ),
}
