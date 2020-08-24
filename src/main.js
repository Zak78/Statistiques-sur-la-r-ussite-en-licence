import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import MenuApp from './MenuApp.vue'
import '../css/styleFormAdd.css'
import '../css/navbarStyle.css'
import '../css/styleFormList.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'



Vue.use(Chartkick.use(Chart))



import {router} from './routes'
Vue.component('home',Home);
Vue.component('MenuApp',MenuApp);
//Vue.component('MenuApp',require('./MenuApp.vue').default);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
