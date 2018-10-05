module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "off",
            "double"
        ],
        "semi": [
            "error",
            "always",
            {"omitLastInOneLineBlock": true}
        ],
        "no-unused-vars":["warn"],
        "no-console":1
    }
};