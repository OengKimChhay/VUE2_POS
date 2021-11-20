import Vue from 'vue';
// route
import router from '@/route/index.js'; //router is the default var must to define otherwise it won't be work
import guard from '@/route/guard/auth.js';
// vuex state managment
import store from './store/index.js';
//  for vue filter(dateformat....)
import '../filter/main.js';
// -------bootstrap--------------
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-vue/dist/bootstrap-vue.css";  //this is for vue bootstrap
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons) //for vue icon
// ------vue marteria-------------
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial);


// ------base components------------
import home from '@/components/Home.vue';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  guard,
  render: h => h(home)
}).$mount('#app')
