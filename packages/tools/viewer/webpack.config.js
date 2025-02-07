const path = require("path");
const webpackTools = require("@dev/build-tools").webpackTools;

module.exports = (env) => {
    env = env || {};
    const source = env.source || "dev";
    const production = env.mode === "production";
    return {
        mode: production ? "production" : "development",
        devtool: production ? "source-map" : "eval-cheap-module-source-map",
        entry: {
            viewer: "./src/index.ts",
            renderOnlyViewer: "./src/renderOnlyIndex.ts",
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            devtoolModuleFilenameTemplate: production ? "webpack://[namespace]/[resource-path]?[loaders]" : "file:///[absolute-resource-path]",
        },
        resolve: {
            extensions: [".js", ".ts"],
            alias: {
                core: `@${source}/core/dist`,
                loaders: `@${source}/loaders/dist`,
                handlebars: "handlebars/dist/handlebars.js",
            },
            symlinks: false,
        },
        externals: {
            fs: true,
        },
        module: {
            rules: webpackTools.getRules(),
        },
        ignoreWarnings: [/Failed to parse source map/],
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            compress: false,
            //open: true,
            port: 1338,
            server: env.enableHttps !== undefined || process.env.ENABLE_HTTPS === "true" ? "https" : "http",
            hot: (env.enableHotReload !== undefined || process.env.ENABLE_HOT_RELOAD === "true") && !production ? true : false,
            liveReload: (env.enableLiveReload !== undefined || process.env.ENABLE_LIVE_RELOAD === "true") && !production ? true : false,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
    };
};
