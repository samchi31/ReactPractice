var path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"), //"./src/index.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /.jsx?$/,
                include: [path.resolve(__dirname, "src")],
                exclude: [path.resolve(__dirname, "node_modules")],
                loader: "babel-loader",
            },
            {
                test: /.css?$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".json", ".js", ".jsx"],
    }
}