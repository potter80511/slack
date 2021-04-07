import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false


var firebaseConfig = {
  apiKey: "AIzaSyACsFb8k7lrLNUdZufGb1tUZuffNLBfc4I",
  authDomain: "vuexslack-bf191.firebaseapp.com",
  projectId: "vuexslack-bf191",
  storageBucket: "vuexslack-bf191.appspot.com",
  messagingSenderId: "440911324915",
  appId: "1:440911324915:web:1f8da9cfaacc56526c3986",
  measurementId: "G-F357PY4BLR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

window.firebase = firebase;

const unsubscribed = firebase.auth().onAuthStateChanged(user => {
  // dispatch user
  store.dispatch('setUser', user);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

  // recursion - this function calls itself on auth change
  unsubscribed();
});

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
