/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import router from './router/index';
import App from './App.vue';
// import 'normalize.css/normalize.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
