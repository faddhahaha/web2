module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "parser":"babel-eslint"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-multi-spaces":0,
        "quotes":0,
        "curly":1,
        "no-new":'off',
        "one-var":'off',
        "no-const-assign": 2,
        "eqeqeq":0,
        "padded-blocks":0,
        "space-infix-ops":0,
        "arrow-spacing":0,
        "no-mixed-spaces-and-tabs":0,
        "space-before-function-paren":0,
        "no-trailing-spaces":0,
        "keyword-spacing":0,
        "spaced-comment":0,
        "no-unused-vars":0,
        "no-alert":1,
        "no-console":0,
        "dot-location":0,
        "space-before-blocks":0,
        "object-property-newline":0,
        "key-spacing":0,
        "no-empty-function":2,
        "no-empty-pattern":2,
        "no-eval":1,
        "use-isnan":2,
        "func-call-spacing":0,
        "no-ex-assign":2,
        "no-dupe-args":2,
        "no-compare-neg-zero":2,
        "no-irregular-whitespace":2,
        "no-unreachable":2,
        "no-magic-numbers":1,
        "camelcase":1,
        "no-tabs":0,
        "space-in-parens":'off',
        "comma-dangle": 1,
        "no-return-assign":0,
        "no-await-in-loop":1,
        "no-unused-expressions":0,
        "no-invalid-regexp":1,
        "comma-style":0,
        "no-mixed-operators":0,
        "block-spacing":1,
        "no-unneeded-ternary":0,
        "no-debugger": 0,
        'indent': 0,
        "comma-spacing":0,
        "prefer-promise-reject-errors":1,
        "eol-last":0,
        "standard/object-curly-even-spacing":0,
        "linebreak-style": [
            "error",
            "windows"
        ],
        "no-undef":0,
        "semi": 0
    }
};