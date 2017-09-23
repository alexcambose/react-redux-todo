module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader",]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
};
