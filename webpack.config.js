const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // читает CSS внутри JS-кода
const HtmlWebpackPlugin = require('html-webpack-plugin'); // учит вебпак работать с html
const WebpackMd5Hash = require('webpack-md5-hash'); // пакет для отслеживания и обновления хеша
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // плагин для дополнительной оптимизации css

const isDev = process.env.NODE_ENV === 'development'; // добавляет стили, добавленные через @import, в финальную сборку

module.exports = {
    entry: {
        main: './src/js/index.js',
        articles: './src/js/articles/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: {loader: "babel-loader"}, // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/i, // решает проблему с svg
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "images",
                            outputPath: "images",
                            useRelativePath: true,
                            esModule: false,
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.css$/, // регулярка: применять это правило только к CSS-файлам
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader), // в зависимости от типа сборки применяем один из этих пакетов
                    // внимание! вместо MiniCssExtractPlugin м.б. объект с ним же и доп.настройкой, задающей путь к коренвой папке. См. подробнее в вебинаре на 30 мин.
                    'css-loader',
                    'postcss-loader' // проставляет вендорные префиксы
                ] // к этим файлам нужно применить пакеты: mini-css-extract-plugin, css-loader
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/, // решает проблему с ошибкой сборки из-за шрифтов
                loader: "file-loader?name=./vendor/[name].[ext]", // если что-то по шрифтам не работает, обрати внимание, что на вебинаре свойство называлось use, а не loader
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/style.[contenthash].css' // на вебинаре: style/style.[contenthash].css
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new WebpackMd5Hash(),

        // первый раз вызываем для index.html
        new HtmlWebpackPlugin({
            // настраиваем плагин:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/pages/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
            chunks: ['main'], // для entry point main: './src/js/index.js'
        }),

        // второй раз вызываем для articles.html
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/articles.html', //
            filename: 'articles.html',
            chunks: ['articles'], // для entry point articles: './src/js/articles/index.js'
        }),
        new webpack.DefinePlugin({ // прокидываем в наше приложение эту переменную
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ]
};
