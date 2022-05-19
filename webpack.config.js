const path = require('path');
exports = [
  {
    experiments: {
      outputModule: true,
    },
    entry: './src/entrypoint.js',
    output: {
      library: {
        type: "module",
      },
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    }
  },
  {
    entry: './src/entrypoint.js',
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    externals: {
      react: 'react',
      'prop-types': 'prop-types'
    },
  },
]
