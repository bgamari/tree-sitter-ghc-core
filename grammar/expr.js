const
qualified = ($, rule) => choice(
    seq($.module_name, '.', rule),
    rule
)
const {parens, braces, sep1} = require('./util.js')

module.exports = {
  varid: _ => /[_a-z\$](\w|'|\$)*#?/,
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

  _aexpr: $ => choice(
    parens($._aexpr),
    $.variable,
    $._case,
    $._let,
    $._cast,
  ),

  expr: $ => choice(
      $._aexpr,
  ),
}
