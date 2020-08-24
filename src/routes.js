import Vue from "vue"
import VueRouter from "vue-router"
import ManipEtudiant from "./etudiant/EtudiantsManipulation"
import statist from "./Stat/statis"
import ManipFiliere from "./Filiere/FiliereManipulation"

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
    component : ManipEtudiant,
    /*children : [
      {
        path : "/",
        component : ManipEtudiant
      },
      {
        path : "/etudiant/edit",
        component : EditEtudiant
      }

    ]*/
  },
  {
    path : "/statistiques",
    component : statist,
  },
  {
    path : "/filieres",
    component : ManipFiliere,
  }

  ]
})
