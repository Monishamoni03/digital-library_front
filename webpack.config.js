const path = require("path");

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "main.js"
    },
    target: "web",
    devServer: {
        port: "3500",
        contentBase: ["./public"],
        open: true,
        historyApiFallback: true,
        liveReload: false,
    },
    resolve: {
        extensions: ["*",".js",".css",".jsx",".json",".jpg",".png",".jpeg"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // for css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // // for images 
            {
                test: /\.(jpg|png)$/,
                use: 
                    {
                        loader: 'file-loader',
                    }
                
            },
        ]
    }
}
