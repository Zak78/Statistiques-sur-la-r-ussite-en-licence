import Vue from "vue"
import VueRouter from "vue-router"
import Manip from "./etudiant/EtudiantsManipulation"

import Home from "./Home.vue"

Vue.use(VueRouter);
export const router =new VueRouter({
  mode: 'history',
  routes :
  [{
    path : "/",
    component : Home
  },
  {
    path: "/etudiant",
    component : Manip,
    /*children : [
      {
        path : "/",
        component : Manip
      },
      {
        path : "/etudiant/edit",
        component : EditEtudiant
      }

    ]*/
  }
  ]
})
