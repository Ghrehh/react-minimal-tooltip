import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: 'src/entrypoint.js',
  output: [
    {
      file: 'dist/rmt-es.js',
      format: 'es',
    },
  ],
  plugins: [
    nodeResolve({
      moduleDirectories: ['src', 'node_modules'],
    }),
    babel({ babelHelpers: 'runtime' }),
    commonjs(),
    terser({
      warnings: true,
      module: true,
    }),
    analyze(),
  ],
  external: ['react', 'react/jsx-runtime', 'prop-types'],
};
