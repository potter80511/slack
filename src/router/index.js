import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '@/pages/Chat';
import Login from '@/pages/Login';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'chat',
    component: Chat,
    beforeEnter: (_to, _from, next) => {
      !firebase.auth().currentUser ? next('/login') : next()
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
