/* eslint-disable import/no-extraneous-dependencies */

import StylelintPlugin from "stylelint-webpack-plugin";
import path from "path";
import PurgecssPlugin from "purgecss-webpack-plugin";
import glob from "glob-all";
import pkg from "./package.json";

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:/]+/g) || [];
    }
}

module.exports = {

    srcDir: __dirname,

    head: {
        title: pkg.name,
        titleTemplate: `%s • ${pkg.name}`,

        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                hid: "description",
                name: "description",
                content: pkg.description,
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    env: {
        version: pkg.version,
    },

    loading: { color: "#94d82d" },

    transition: "",

    css: ["@/assets/css/main.css"],

    plugins: [],

    modules: [],

    build: {
        extractCSS: true,

        extend(config, { isDev }) {
            /* vue-svg-loader */
            /* eslint-disable no-param-reassign */
            const imageModule = config.module.rules.find(({ test }) => {
                if (test) return test.source === "\\.(png|jpe?g|gif|svg|webp)$";
                return false;
            });
            imageModule.test = /.(png|jpe?g|gif|webp)$/;
            /* eslint-enable no-param-reassign */

            config.module.rules.push({
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /single/,
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: "svg/[name].[ext]",
                        },
                    },
                    {
                        loader: "vue-svg-loader",
                        options: {
                            svgo: {
                                plugins: [
                                    { removeDoctype: true },
                                    { removeComments: true },
                                    { removeViewBox: false },
                                    { removeDimensions: true },
                                ],
                            },
                        },
                    },
                ],

            });

            /* Stylelint */
            config.plugins.push(new StylelintPlugin({
                files: ["**/*.vue", "**/*.s?(a|c)ss"],
                fix: true,
            }));

            /* eslint-loader */
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                });
            }

            /*
            ** Cleanup CSS with PurgeCSS
            */
            if (!isDev) {
                config.plugins.push(
                    new PurgecssPlugin({
                        paths: glob.sync([
                            path.join(__dirname, "./pages/**/*.vue"),
                            path.join(__dirname, "./layouts/**/*.vue"),
                            path.join(__dirname, "./components/**/*.vue"),
                        ]),
                        extractors: [{
                            extractor: TailwindExtractor,
                            extensions: ["vue"],
                        }],
                        whitelist: ["html", "body", "nuxt-progress"],
                    }),
                );
            }
        },
    },
};
