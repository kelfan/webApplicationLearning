module.exports = {
    entry: {
        index: "./js/index" // app start point at index.js
    },
    output: {
        filename: "[name].js" // output as  js file with module name
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    },
                    // ts-loader need installed first
                    "ts-loader"
                ],
                // exclude : /(node_modules)/
                exclude: /node_modules/
            }
        ]
    }
};