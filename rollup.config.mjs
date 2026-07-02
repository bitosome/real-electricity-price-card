import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/real-electricity-price-card.ts',
  output: {
    file: 'dist/real-electricity-price-card.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
};
