const

parens = (...rule) => seq('(', ...rule, ')')

braces = (...rule) => seq('{', ...rule, '}')

brackets = (...rule) => seq('[', ...rule, ']')

angle_brackets = (...rule) => seq('<', ...rule, '>')

sep = (sep, rule) => optional(seq(rule, repeat(seq(sep, rule))))

sep1 = (sep, rule) => seq(rule, repeat(seq(sep, rule)))

module.exports = {
    parens,
    braces,
    brackets,
    angle_brackets,
    sep,
    sep1,
}
