import Vue from "vue"
import VueRouter from "vue-router"
import AddEtudiant from "./etudiant/Add_etudiant"
import ListEtudiants from "./etudiant/List_etudiants"
import EditEtudiant from "./etudiant/Edit_etudiant"

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
    component : ListEtudiants,
    children : [
      {
        path : "/",
        component : AddEtudiant
      },
      {
        path : "/etudiant/edit",
        component : EditEtudiant
      }

    ]
  }
  ]
})
