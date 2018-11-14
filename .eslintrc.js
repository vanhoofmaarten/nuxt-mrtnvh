module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: ["airbnb-base", "plugin:vue/recommended"],
    plugins: ["vue"],
    rules: {
        "max-len": 0,
        "no-tabs": 0,
        indent: ["error", 4],
        quotes: [2, "double"],
        camelcase: 0,
        "vue/html-indent": [
            "error",
            "tab",
            {
                attribute: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        "linebreak-style": 0,
        "no-underscore-dangle": ["error", { allow: ["__NUXT__"] }]
    },
    globals: {},
    settings: {
        "import/resolver": {
            webpack: "webpack.config.js"
        },
        "import/core-modules": ["vuex", "vue", "vue-router"]
    }
};
