module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react", "babel", "react", "jsx-a11y"],
  rules: {
    "import/first": ["off"],
    "global-require": ["off"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    "react/prop-types": ["off"],
    "no-confusing-arrow": 0,
    "array-callback-return": 0,
    "consistent-return": 0,
    "no-mixed-spaces-and-tabs": 0,
    "max-len": 0,
    "no-use-before-define": 0,
    "no-tabs": 0,
    "valid-jsdoc": 1,
    indent: [1, 4],
    "no-unused-vars": [1, { vars: "local", args: "none" }],
    "react/forbid-prop-types": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": 1,
    "react/jsx-key": 1,
    "react/jsx-max-props-per-line": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-undef": 1,
    "react/jsx-quotes": 0,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 0,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/jsx-filename-extension": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 1,
    "react/sort-comp": 1,
    "id-length": 0,
    "react/prop-types": 1,
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["warn", "single", { "allowTemplateLiterals": true }],
    semi: ["error", "always"],
    "no-console": ["warn", { allow: ["info", "error"] }],
    "arrow-parens": ["error", "always"]
  }
};
