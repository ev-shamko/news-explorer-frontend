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
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
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
                    isDev // в зависимости от типа сборки применяем один из этих пакетов
                        ? 'style-loader'
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../', // этот параметр проставит правильный путь до папки dist/images в css-файле
                                // а именно: "../images/pic.jpg" а не "images/pic.jpg"
                                // также будет правильная ссылка на папку со шрифтами: "../fonts/f.woff"
                            },
                        },
                    'css-loader',
                    'postcss-loader', // проставляет вендорные префиксы
                ], // к этим файлам нужно применить пакеты: mini-css-extract-plugin, css-loader
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/, // решает проблему с ошибкой сборки из-за шрифтов
                loader: "file-loader?name=./vendor/[name].[ext]", // если что-то по шрифтам не работает, обрати внимание, что на вебинаре свойство называлось use, а не loader
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { calc: false }], // { calc: false } отключает оптимизацию calc-уравнений в css-свойствах
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
