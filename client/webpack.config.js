const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');


module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : 'bundle.js',
            assetModuleFilename:'images/[hash][ext][query]',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|test.tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                }, {
                    test: /\.(s[ac]ss)$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true, 
                            }
                        }],
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: 'asset/resource',
                }
            ],
        },
        optimization: isProduction ? {
            minimize: true,
            runtimeChunk: {
                name: 'runtime',
            },
        } : { minimize: true, },
        plugins: isProduction ? [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: './index.html',
            })
        ] : [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Receipe Generator',
                template: './public/index.html',
                filename: './index.html',
                base: '/'
            })],
        devServer: {
            port: 3001,
            historyApiFallback: true,

        },
        performance: {
            maxEntrypointSize: 5120000,
            maxAssetSize: 5120000
        },
        target: 'web',
        devtool: 'source-map',
    };
};