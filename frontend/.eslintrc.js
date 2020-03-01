module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        'airbnb'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console":"off",
        "no-alert":"off",
        "react/prop-types":"off",
        "react/jsx-filename-extension":"off",
        "react/prefer-stateless-function":"off",
        "no-param-reassign":"off",
        "class-methods-use-this":"off",
        "react/destructuring-assignment":"off",
        "max-len":"off",
        "jsx-a11y/label-has-associated-control":"off",
        "react/sort-comp":"off"
    }
};