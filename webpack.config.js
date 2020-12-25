const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'simple-svg-editor': './src/dist.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new ESLintPlugin({
            files: ['./src'],
            useEslintrc: false,
            overrideConfig: {
                parser: 'babel-eslint',
                env: {
                    browser: true,
                    commonjs: true,
                    es6: true,
                    node: true, 
                },
                extends: 'eslint:recommended',
            }
        }), 
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer(),
                                ],
                            },
                        },
                    }
                ],
            },
            {
                test: /\.scss$/i,
                use: ['sass-loader'],
            },
        ],
    },
};