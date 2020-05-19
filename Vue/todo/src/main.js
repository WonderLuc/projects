import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import initialState from './store/store';
import VueRouter from 'vue-router';
import MainPage from './components/MainPage/MainPage';
import EditPage from './components/EditPage/EditPage';
import Page404 from './components/Page404/Page404';

Vue.config.productionTip = false

const routes =[
  {path:'/', component: MainPage,},
  {path:'/edit/:id', component: EditPage,},
  {path:'*', component:Page404}
];
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});


Vue.use(Vuex);
const store = new Vuex.Store(initialState);

store.subscribe((mutations, state)=>{
    localStorage.setItem('state',JSON.stringify(state));
});

new Vue({
  router,
  render: h => h(App),
  store,
  
}).$mount('#app')
