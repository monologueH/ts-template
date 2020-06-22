import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/index.vue';

Vue.use(Router);

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 * */
const constantRouterMap = [
  {
    path: '/Home',
    // eslint-disable-next-line import/no-unresolved
    component: Home,
    hidden: true,
  },
  { path: '*', redirect: '/Home', hidden: true },
];

export { constantRouterMap };
export default new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
