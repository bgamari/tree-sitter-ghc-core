module.exports = {
    con_pat: $ => seq(
        $.tycon,
        repeat($.varid),
    ),

    pat: $ => choice(
        $.int_lit,
        $.con_pat
    ),
}
