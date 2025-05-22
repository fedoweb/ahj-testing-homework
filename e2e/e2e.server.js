const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

module.exports = async () => {
  const compiler = webpack(config);
  const server = new WebpackDevServer(compiler, {
    contentBase: '/', // Корневая директория для статики
    compress: true,  // Включаем сжатие ресурсов
    port: 9000       // Порт для сервера
  });

  await new Promise(resolve => {
    server.startCallback(() => {
      console.log('DevServer started on port 9000');
      resolve();
    });
  });
};