<template>
<div>
  <!-- Parcourir le fichier -->
  <div class="divRech1">
    <input type="file" value="Parcourir" accept="application/json" @change="onFileChange" id="inputFile"/>
    
  
  </div>

<!--Filtrage des données -->
  <div class="divRech2">

    <div class="form-row" id="divFiltre">
      <div>
        <label id="labelFiliere">Filiére :</label>
        <select id="inputFiliere" class="form-control" v-model="selected_filiere">
          <!--chargement des années du fichier -->
          <option v-for="(fil,f) in filieres_affich" :key="f">{{fil}}</option>
        </select>
      </div>
      <div>
        <!-- choix du type de statitistiques -->
        <label id="labelYear">Type de statistiques :</label>
        <body>
          <select id="inputYear" class="form-control" v-model="selected_type" @change="chercher">
            <option>Effectif</option>
            <option>Origine</option>
            <option>Taux de reussite</option>
            <option>Poursuite</option>
          </select>
        </body>
      </div>

    <div>

      <!-- s'affihe quand on choisi le type taux de reussite -->
        <select v-show="filtrage" @change="chercher" v-model="selected_type_reussite" class="form-control" id="filtrageTaux">
          <option>Semestre 1 </option>
          <option>Semestre 2 </option>
          <option>Année  </option>
        </select>
    </div>

    </div>

  </div> <!--end du div de filtrage -->

    <div id="TabStatic">
<!-- l'affichage du tableau de chiffres et des statistiques sa depend du type selectionné -->
      <div v-show="selected_type==='Effectif'" class="tabAffichage">
        <table  >
          <thead>
            <th v-for="(ann,a) in annees_affich" :key="a">{{ann}}</th>
          </thead>
          <tbody>
            <td v-for="(effect,ef) in effectifs_tab" :key="ef">{{effect}}</td>
          </tbody>
        </table>
      
      </div>

      <div v-show="selected_type==='Origine'" class="tabAffichage">
        <table >
          <thead>
            <th></th>
            <th v-for="(type,t) in type_origine" :key="t" colspan="2">{{type}}</th>
          </thead>
          <tbody>
           
           <tr v-for="(row, o) in origines_tab" :key="o">
              <td v-for="(col, c) in row" :key="c">{{origines_tab[o][c]}}</td>
            </tr>
          </tbody>
        </table>
      
      </div>

       <div v-show="selected_type==='Taux de reussite'" class="tabAffichage">
        <table >
          <thead>
            <th></th>
            <th v-for="(type,t) in type_reussite" :key="t" colspan="2">{{type}}</th>
          </thead>
          <tbody>
            <tr v-for="(row, o) in reussite_tab" :key="o">
              <td v-for="(col, c) in row" :key="c">{{reussite_tab[o][c]}}</td>
            </tr>
          </tbody>
        </table>
         
      </div>


      <div v-show="selected_type==='Poursuite'" class="tabAffichage">
        <table >
          <thead>
            <th></th>
            <th v-for="(type,t) in type_poursuite" :key="t" colspan="2">{{type}}</th>
          </thead>
          <tbody>
            <tr v-for="(row, o) in poursuite_tab" :key="o">
              <td v-for="(col, c) in row" :key="c">{{poursuite_tab[o][c]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--<a href="javascript:window.print()"><button>Print the page</button></a>-->
      <div class="container">

</div>

    </div>
  </div>

</template>
<script>
//import { Bar } from 'vue-chartjs'
//import { Line } from 'vue-chartjs'

import { Etudiant } from "../../models/etudiant";
import { Filiere } from "../../models/filiere";
import { Semestre } from "../../models/semestres";
export default {
  data() {
    return {
      effectif: "",
      data: Array,
      selected_type: "",
      selected_filiere: "",
      selected_type_reussite:"",
      filieres_affich: new Array(),
      annees_affich: new Array(),
      effectifs_tab: new Array(),
      origines_tab: new Array(),
      poursuite_tab: new Array(),
      reussite_tab:new Array(),
      chart_tab:new Array(),
      etudiants: Array,
      type_origine: [],
      type_poursuite: [],
      type_reussite:[],
      //s:Object,
      filieres: Array,
      semestre: Object,
      filiere: Object,
      etudiant: Object,
      filtrage:false,
     
      
    };
  },
  methods: {
    chercher() {
      //la methode qui permet d'afficher le tableau des chiffres et des stats
      //vider les tableaux au debut de chaque appelle pour ne pas avoir des double chaque fois 
      //kayat3awdou min kanakiki 3la wa7da w nbadalha blokhra 
      //à partie du type selectionné il fait les calculs, l'affichage et les stats 
      this.effectifs_tab=[];
      this.origines_tab=[];
      this.poursuite_tab=[];
      this.reussite_tab=[];
      this.rowOrigine = [];
      this.rowPoursuite = [];
      this.rowReussite=[];
      this.data_chart=[];

      this.type_origine = ["L2", "Redoublants", "DUT", "Etrangers", "Autres"];
      this.type_poursuite = ["Oui", "Non", "OuiUHA"];
      this.type_reussite= ["Admis", "Ajournes","Defaillants"];
      this.annees_affich=[];
      for (let filiere of this.filieres) {
        if (filiere._nom === this.selected_filiere) {
          this.annees_affich.push(filiere._annee);
        }
      }
      
      for (let filiere of this.filieres) {
        for (let ann of this.annees_affich) {
          if (filiere._nom === this.selected_filiere && filiere._annee === ann)
            {
              
            if (this.selected_type === "Effectif") {
              this.effectif = filiere.calculer_effectif();
              this.effectifs_tab.push(this.effectif);
             
            } else {
              if (this.selected_type === "Origine") {
                this.rowOrigine.push(ann);
                for (let type of this.type_origine) {
                  this.nombreOrigine = filiere.calculer_origine(type);
                  this.rowOrigine.push(this.nombreOrigine);
                  this.tauxOrigine=(this.nombreOrigine*100)/filiere.calculer_effectif();
                  this.rowOrigine.push(this.tauxOrigine + "%");
                
                }
                this.origines_tab.push(this.rowOrigine);
                this.rowOrigine = [];
               

              } 
              else {
                if (this.selected_type === "Poursuite") {
                  this.rowPoursuite.push(ann);
                  for (let type of this.type_poursuite) {
                    this.nombrePoursuite = filiere.calculer_poursuite(type);
                    this.rowPoursuite.push(this.nombrePoursuite);
                    this.tauxPoursuite =(this.nombrePoursuite*100)/filiere.calculer_effectif();
                     this.rowPoursuite.push(this.tauxPoursuite + " %");
                  }
                  this.poursuite_tab.push(this.rowPoursuite);
                  this.rowPoursuite = [];
                  
                }
                else {
                if(this.selected_type === "Taux de reussite"){
                  this.filtrage=true;
                  if(this.selected_type_reussite === "Semestre 1")
                  {
                    this.rowReussite.push(ann);
                    for(let type of this.type_reussite){
                    this.nombreReussite = filiere.calculer_reussite(type,"s1");
                    this.rowReussite.push(this.nombreReussite);
                    this.tauxSemestresUn =(this.nombreReussite*100)/filiere.calculer_effectif();
                     this.rowReussite.push(this.tauxSemestresUn + " %");
                    }
                  }else if(this.selected_type_reussite === "Semestre 2")
                  {
                    this.rowReussite.push(ann);
                    for(let type of this.type_reussite){
                    this.nombreReussite = filiere.calculer_reussite(type,"s2");
                    this.rowReussite.push(this.nombreReussite);
                    this.tauxSemestresDeux =(this.nombreReussite*100)/filiere.calculer_effectif();
                     this.rowReussite.push(this.tauxSemestresDeux + " %");
                    }
                  }else if(this.selected_type_reussite === "Année")
                  {
                    this.rowReussite.push(ann);
                    for(let type of this.type_reussite){
                    this.nombreReussite = filiere.calculer_reussite(type,"Année");
                    this.rowReussite.push(this.nombreReussite);
                    this.tauxAnnee =(this.nombreReussite*100)/filiere.calculer_effectif();
                     this.rowReussite.push(this.tauxAnnee + " %");
                    
                    }
                  }
                  this.reussite_tab.push(this.rowReussite);
                  this.rowReussite=[];
                }
              }
              }
              
            }
          } //fin if
        } //fin for 2
      } //fin for 1
    },

    //la methode charge tous les filiere du data dans un tableau apres elle supprime les double 
  
    remplir_filiere() {
      for (let filiere of this.filieres) {
        this.filieres_affich.push(filiere._nom);
      }
      for (let i = 0; i < this.filieres_affich.length; i++) {
        for (let j = i + 1; j < this.filieres_affich.length; j++) {
          if (this.filieres_affich[i] === this.filieres_affich[j]) {
            this.filieres_affich.splice(j, 1);
          }
        }
      }
    },

    //la methode qui permet de remplir les tableaux à partie des fichier 
    remplir() {
      this.etudiants = new Array();
      this.filieres = new Array();

      for (let filiere of this.data) {
        for (let etudiant of filiere._etudiants) {
          this.semestre = new Semestre(
            etudiant._semestres._semestreUn,
            etudiant._semestres._semestreDeux
          );
          this.etudiant = new Etudiant(
            etudiant._ine,
            etudiant._origine,
            this.semestre,
            etudiant._poursuite,
            etudiant._reussite
          );
          this.etudiants.push(this.etudiant);
        }
        let nom = filiere._nom;
        let annee = filiere._annee;
        this.filiere = new Filiere(nom, annee, this.etudiants);
        this.filieres.push(this.filiere);
        this.etudiants = [];
      }
    },
    //telecharger, convertie et lire le fichier JSON
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0]);
    },
    readFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        //console.log(e.target.result);
        this.data = JSON.parse(e.target.result);
        this.remplir();
        this.remplir_filiere();
      };
      reader.readAsText(file);
    },
  },
};
</script>




