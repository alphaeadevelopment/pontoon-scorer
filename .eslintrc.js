module.exports = {
  "extends": "airbnb",
  "globals": {
    "describe": true,
    "it": true,
    "fit": true,
    "xit": true,
    "expect": true,
  },
  "parser": "babel-eslint",
  "plugins": [
    "class-property"
  ],
  "rules": {
    "arrow-body-style": "warn",
    "brace-style": ["error", "stroustrup"],
    "class-methods-use-this": "off",
    "function-paren-newline": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"]
    }],
    "jsx-quotes": ["error", "prefer-single"],
    "max-len": ["warn", { "code": 120 }],
    "no-plusplus": "off",
    "no-shadow": "off",
    "object-curly-newline": "off",
    "quote-props": ["error", "consistent"],
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-one-expression-per-line": "error",
    "react/no-array-index-key": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
  },
}
