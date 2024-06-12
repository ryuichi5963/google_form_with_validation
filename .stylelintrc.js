module.exports = {
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-standard",

    "stylelint-config-recommended",
    "stylelint-prettier/recommended",
  ],
  plugins: [
    "stylelint-order",
    "stylelint-prettier",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    "prettier/prettier": true,
    "no-descending-specificity": null, // 優先度の高いセレクターの後に優先度の低いセレクターを書くことを許可
    "plugin/declaration-block-no-ignored-properties": true,
    "color-hex-length": null,
    "color-named": "never",
    "property-no-vendor-prefix": null,
    "shorthand-property-no-redundant-values": null,
    "selector-class-pattern": null,
  },
};
