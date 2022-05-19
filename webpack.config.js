/*module.exports = [
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
      library: {
        name: 'ye',
        type: "umd"
      },
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
  */

export default [
  {
      target: [
        'web',
        'es2020'
      ],
    experiments: {
      outputModule: true,
    },
    entry: './src/entrypoint.js',
    output: {
      filename: 'esm.js',
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
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    output: {
      filename: 'cjs.js',
      library: {
        name: 'ye',
        type: "umd"
      },
    },
    externals: [
      'react',
      'prop-types'
    ]
  }
]
