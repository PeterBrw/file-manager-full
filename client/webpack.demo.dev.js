const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const DIST_DIR = path.resolve(__dirname, "demo/development/dist");
const SRC_DIR = path.resolve(__dirname, "demo/development");

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        open: true,
    },
    devtool: "cheap-module-eval-source-map",
    entry: `${SRC_DIR}/index.js`,
    output: {
        filename: "[name].js",
        path: DIST_DIR,
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        envName: "mjs",
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: `${SRC_DIR}/index.html`,
            filename: `${DIST_DIR}/index.html`,
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    externals: [
        {
            react: "React",
            "react-dom": "ReactDOM",
            "react-dom/server": "ReactDOMServer",
        },
    ],
};
