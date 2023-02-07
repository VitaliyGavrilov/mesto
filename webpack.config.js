const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключвем плагин для работы с html файлами
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключили к проекту mini-css-extract-plugin для обработки css файлов

module.exports = {
  entry: { main: './src/pages/index.js' },// указали первое место, куда заглянет webpack
  output: {
    path: path.resolve(__dirname, 'dist'),// указали в какой файл будет собираться весь js и дали ему имя
    filename: 'main.js',
      publicPath: ''
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил для обработки js, html и других файлов
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
          'postcss-loader']
      },
    ]
  },
  plugins: [// добавляем массив-обьект опций
    new HtmlWebpackPlugin({//подключение плагина для работы с html
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин для удаления содержимого дист
    new MiniCssExtractPlugin() // подключение плагина для объединения css файлов
  ] 
}
  