module.exports = {
    con_pat: $ => seq(
        $.con_nm,
        repeat($.varid),
    ),

    pat: $ => choice(
        $.int_lit,
        $.con_pat
    ),
}
