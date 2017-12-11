import babel from 'rollup-plugin-babel'
import flow from 'rollup-plugin-flow'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'lib/index.js',
  output: [
    {
      file: 'dist/react-performance.js',
      format: 'es',
      exports: 'named',
    },
    {
      file: 'dist/react-performance.umd.js',
      format: 'umd',
      exports: 'named',
      name: 'ReactPerformance',
      globals: {
        'react': 'React',
      },
    },
  ],
  plugins: [
    flow(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup', 'stage-0', "react"],
    }),
    nodeResolve(),
  ],
  external: [
    'react',
  ],
}
