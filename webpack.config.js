  const path = require('path');

  module.exports = {
    entry: './src/entrypoint.js',
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      library: 'reactMinimalTooltip',
      libraryTarget: 'umd',
    },
    externals: {
     react: {
       commonjs: 'react',
       commonjs2: 'react',
       amd: 'react',
       root: '_',
     },
   },
  };
