module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: __dirname + '/dist/',
        publicPath: "/dist/",
        filename: 'index.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    // plugins: [
    //     new ExtractTextPlugin('dist/styles/main.css', {
    //         allChunks: true
    //     })
    // ],
    externals: {
    }
};