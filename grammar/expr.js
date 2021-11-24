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

  _case: $ => seq(
      'case',
      $.expr,
      'of',
      braces($._case_alts),
  ),
  _case_alts: $ => sep1(',', $._case_alt),
  _case_alt: $ => seq(
      $.pat,
      '->',
      braces($.expr),
  ),

  _let: $ => seq(
      'let',
      braces($.binding),
      'in',
      $.expr
  ),

  _cast: $ => seq(
      $.expr,
      $.coercion
  ),

  _app: $ => seq(
      $.expr,
  ),

  _lambda_bndr: $ => choice(
      $._value_lambda_bndr,
      $._type_lambda_bndr
  ),

  _value_lambda_bndr: $ => parens(seq(
      $.varid,
      '::',
      $.type
  )),

  _type_lambda_bndr: $ => parens(seq(
      '@',
      $.varty,
      '::',
      $.type
  )),

  _lambda: $ => seq(
      '\\',
      repeat1($._lambda_bndr),
      '->',
      $.expr
  ),

  _aexpr: $ => choice(
    parens($._aexpr),
    $.literal,
    $.variable,
    $._case,
    $._let,
    $._cast,
    $._lambda,
  ),

  expr: $ => choice(
      $._aexpr,
  ),
}
