module.exports = [
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
      modules: ['src', 'node_modules'],
    },
    externals: [
      'react',
      'prop-types'
    ],
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
      modules: ['src', 'node_modules'],
    },
    output: {
      libraryTarget: 'umd',
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
    externals: [
      'react',
      'prop-types'
    ],
  },
]
