let
  nixpkgs = import <nixpkgs> {};
in
with nixpkgs;

nixpkgs.symlinkJoin {
  name = "hi";
  paths = [
    (tree-sitter.override { webUISupport = true; })
    nodejs
  ];
}
