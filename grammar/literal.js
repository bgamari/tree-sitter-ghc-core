const

decimal = /[0-9][0-9_]*/
magic_hash = rule => token(seq(rule, optional(token.immediate(/##?/))))
exponent = /[eE][+-]?[0-9_]+/

module.exports = {
  int_lit: _ => magic_hash(decimal),

  float_lit: _ => magic_hash(
    seq(
      decimal,
      choice(
        seq(/\.[0-9_]+/, optional(exponent)),
        exponent,
      ),
    ),
  ),

  char_lit: _ => magic_hash(
    choice(
      /'[^']'/,
      /'\\[^ ]*'/,
    ),
  ),

  string_lit: _ => seq(
      '"',
      repeat(choice(
        /[^\\"\n]/,
        /\\(\^)?./,
        /\\\n\s*\\/,
      )),
      '"',
  ),

  literal: $ => choice(
      $.int_lit,
      $.float_lit,
      $.char_lit, 
      $.string_lit,
  ),
}
