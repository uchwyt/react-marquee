module.exports = {
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true,
  },
  "plugins": [
    "react",
    "compat"
  ],
  "extends": ["google", "eslint:recommended", "plugin:react/recommended"],
  "rules": {
      "compat/compat": "error"
  },
  "settings": {
    "polyfills": ["promises"]
  }
};
