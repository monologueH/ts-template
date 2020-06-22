import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';

const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
// 处理vue文件
const html = require('rollup-plugin-bundle-html');
const copy = require('rollup-plugin-copy');

export default {
  input: './src/vue-demo/index.js', // 引入的文件
  output: {
    format: 'umd', // amd commonjs规范  默认将打包后的结果挂载到window上
    file: 'dist/main.js', // 打包出的vue.js 文件  new Vue
    name: 'Vue',
    sourcemap: true,
  },
  plugins: [
    babel({ // 解析es6 -》 es5
      exclude: 'node_modules/**', // 排除文件的操作 glob
    }),
    copy({
      targets: [
        { src: 'src/example/public/*', dest: 'dist' },
      ],
      copyOnce: true,
    }),
    html({
      template: 'src/vue-demo/public/index.html',
      dest: 'dist',
      filename: 'index.html',
      inject: 'body',
      ignore: '/main.js/',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser'),
    }),
    resolve({ extensions: ['.vue'] }),
    commonjs(),
    vue(),
    serve({ // 开启本地服务
      open: true,
      openPage: '/dist/index.html', // 打开的页面
      port: 10002,
      historyApiFallback: true,
      contentBase: '',
    }),
  ],
};
