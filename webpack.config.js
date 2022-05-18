module.exports = [
  {
    experiments: {
      outputModule: true,
    },
    entry: './src/entrypoint.js',
    resolve: {
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
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
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
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
