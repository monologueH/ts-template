// Build
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const ts = require('rollup-plugin-typescript2');
const filesize = require('rollup-plugin-filesize');
const { terser } = require('rollup-plugin-terser');
// Dev
const clear = require('rollup-plugin-clear');
const html = require('rollup-plugin-bundle-html');
const copy = require('rollup-plugin-copy');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const json = require('@rollup/plugin-json');

const env = process.env.NODE_ENV || 'development';
const shouldMinify = process.env.X_MINIFY || false;

const settings = [];
const defaultExtensions = ['.js', '.jsx', '.ts', '.tsx'];
// outputs
if (env === 'development') {
  settings.push({
    input: 'src/example/main.ts',
    output: {
      format: 'iife',
      file: 'public/js/baseTools.js',
      name: 'baseTools',
      sourcemap: true,
    },
  });
} else if (env === 'production') {
  const formats = process.env.X_FORMAT && process.env.X_FORMAT.length
    ? process.env.X_FORMAT.split(' ') : ['cjs', 'iife', 'esm'];
  settings.push(...formats.map((format) => ({
    input: 'src/index.ts',
    output: {
      format,
      file: `lib/prod/vrTools${format === 'cjs' ? '' : `.${format}`}${shouldMinify ? '.min' : ''}.js`,
      name: 'VrTools',
      sourcemap: !shouldMinify,
    },
  })));
}

settings.forEach((s) => {
  Object.assign(s, {
    plugins: generatePlugins(env, s.output.format),
    onwarn: (warning) => {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      if (typeof warning === 'string') {
        console.warn(warning);
      } else {
        // cleaning third party's circular dependencies
        if (
          warning.code === 'CIRCULAR_DEPENDENCY'
          && (/node_modules/g).test(warning.message)
        ) return;
        console.warn(warning.message);
      }
    },
  });
});

function generatePlugins(environment, format) {
  const plugins = [];

  // clear
  if (environment === 'development') {
    plugins.push(clear({ targets: ['public'], watch: false }));
  }

  // commonjs
  plugins.push(commonjs({
    include: /node_modules/,
  }));

  // resolve
  plugins.push(resolve({
    extensions: defaultExtensions,
    browser: true,
    mainFields: ['module', 'browser', 'main'],
  }));

  // ts
  const tsConfig = {
    check: true,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    objectHashIgnoreUnknownHack: true,
    clean: true,
    tsconfigOverride: {
      sourceMap: environment === 'development',
      exclude: ['**/__tests__', 'src/public'],
    },
  };
  if (format === 'iife') {
    Object.assign(tsConfig.tsconfigOverride, {
      target: 'es6',
      module: 'esnext',
    });
  }
  plugins.push(ts(tsConfig));

  // dev-html-related
  if (environment === 'development') {
    plugins.push(
      copy({
        targets: [
          { src: 'src/example/public/*', dest: 'public' },
        ],
        copyOnce: true,
      }),
      html({
        template: 'src/example/index.html',
        dest: 'public',
        filename: 'index.html',
        inject: 'footer',
        ignore: '/main\.js/',
      }),
      serve({
        open: false,
        openPage: 'public/index.html',
        contentBase: 'public',
        host: '0.0.0.0',
      }),
      livereload({
        watch: ['public'],
      }),
      json(),
    );
  }

  // minify
  if (shouldMinify) {
    plugins.push(terser());
  }

  if (environment === 'production') plugins.push(filesize());

  return plugins;
}

module.exports = settings;
module.exports.default = settings;
