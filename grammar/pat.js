module.exports = {
    con_pat: $ => seq(
        $.conid,
        repeat($.varid),
    ),

    pat: $ => choice(
        $.int_lit,
        $.con_pat
    ),
}
