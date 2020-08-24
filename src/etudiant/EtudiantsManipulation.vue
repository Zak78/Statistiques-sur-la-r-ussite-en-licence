<template>
<div class="all">
  <div class="divRech">

    <div class="divRech1">
      <!--Parcourir lr fichier choisi -->
      <input type="file" value="Parcourir" accept="application/json" @change="onFileChange" id="inputFile"/>
      <!-- Sauvegarder le fichier apres les modifications effectuer -->
      <button type="button" class="btn btn-outline-warning" id="btnSauvegarder" @click="sauvegarder">Sauvegarder</button>
    </div>

    <div class="divRech2">
      <div class="form-row" id="divFiltre">
        <div>
          <!--telechargement des filieres et des années à partir du fichier choisi -->
          <label id="labelFiliere">Filiére :</label>
          <select id="inputFiliere" class="form-control" v-model="selected_filiere">
            <option v-for="(fil,f) in filieres_affich" :key="f">{{fil}}</option>
          </select>
        </div>
        <div>
          <label id="labelYear">Année scolaire :</label>
          <body>
            <select id="inputYear" class="form-control" v-model="selected_annee">
              <option v-for="(year,y) in annees_affich" :key="y">{{year}}</option>
            </select>
          </body>
        </div>
        <button class="btn btn-outline-warning" id="btnChercher" @click="chercher">Chercher</button>
      </div>
    </div>

  </div>

  <div class="row">
    <div class="col-lg-5">
      <form> <!-- formulaire pour les informations des étudiants -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="ineForm" >INE</span>
          </div>
          <span v-if="modification_acive=== true">
            <input type="text" class="form-control" id="ine" v-model="ine" style="width :400px ;" disabled="disabled" />
          </span>
          <span v-else-if="modification_acive=== false">
            <input type="text" class="form-control" id="ine" style="width :400px ;" v-model="ine" />
          </span>
        </div>

        <div class="form-row">
          <div class="form-group col-md-4">
            <label>Origine :</label>
            <select class="form-control" v-model="selected_origine">
              <option>L2</option>
              <option value="Redoublants">Redoublants</option>
              <option value="DUT">DUT</option>
              <option value="Etrangers">Etrangers</option>
              <option value="Autres">Autres</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <label>Semestre 1:</label>
            <select class="form-control" v-model="selected_s1">
              <option>Admis</option>
              <option>Ajournes</option>
              <option>Defaillants</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label>Semestre 2 :</label>
            <select class="form-control" v-model="selected_s2">
              <option>Admis</option>
              <option>Ajournes</option>
              <option>Defaillants</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label>Reussite :</label>
            <select class="form-control" v-model="selected_reussite">
              <option>Admis</option>
              <option>Ajournes</option>
              <option>Defaillants</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label>Poursuite :</label>
            <select class="form-control" v-model="selected_poursuite">
              <option>Oui</option>
              <option>OuiUHA</option>
              <option>Non</option>
            </select>
          </div>
        </div>
        <br />
        <button type="button" class="btn btn-outline-warning" @click="ajouter">ajouter</button>
        <button type="button" class="btn btn-outline-warning" @click="modifier">modifier</button>
        <button type="button" class="btn btn-outline-warning" @click="Supprimer">Supprimer</button>
      </form>
    </div>

    <!-- le tableau des étudiants du filiére -->
    <div class="col-lg-6" id="QTDiv" v-show="vrai">
      <table  id="tableResultat">
        <thead>
          <tr>
            <th>INE</th>
            <th>Origine</th>
            <th>Semestre 1</th>
            <th>Semestre 2</th>
            <th>Reussite</th>
            <th>Poursuite</th>
          </tr>
        </thead>
        <!-- affichage des données dans le tableau apres la selection de l'année et de la filiere -->
        <tr v-for="(value,v) in etud_choisi" :key="v">
          <td @click="remplir_form(value._ine)" id="hoverCurseur">{{value._ine}}</td>
          <td>{{value._origine}}</td>
          <td>{{value._semestres._semestreUn}}</td>
          <td>{{value._semestres._semestreDeux}}</td>
          <td>{{value._reussite}} </td>
          <td>{{value._poursuite}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>
<script>
import { Etudiant } from "../../models/etudiant";
import { Filiere } from "../../models/filiere";
import { Semestre } from "../../models/semestres";
export default {
  data() {
    return {
      vrai: false,
      data: Array,
      selected_annee: "",
      selected_filiere: "",
      etud_choisi: Array,
      etudiants: Array,
      filieres_affich: new Array(),
      annees_affich: new Array(),
      filieres: Array,
      semestre: Object,
      filiere: Object,
      etudiant: Object,
      ine: "",
      selected_origine: "",
      selected_s1: "",
      selected_s2: "",
      selected_poursuite: "",
      selected_reussite:"",
      modification_acive: false,
    };
  },

  methods: {

    //la recherche des etudiant par annee et filiere 
    chercher() {
      this.vrai = true;
      this.etud_choisi = new Array();

      for (let i = 0; i < this.filieres.length; i++) {
        if (
          this.selected_annee === this.filieres[i].annee &&
          this.selected_filiere === this.filieres[i].nom
        ) {
          for (let j = 0; j < this.filieres[i].etudiants.length; j++) {
            this.etud_choisi[j] = this.filieres[i].etudiants[j];
          }
        }
      }
    },
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
        this.filtrage_annee_filiere();
      };
      reader.readAsText(file);
    },

    //remplir la form à partir d'etudiant choisi 
    remplir_form(ine) {
      this.modification_acive = true;
      this.etudiant = null;

      for (let filiere of this.filieres) {
        if (
          filiere._nom === this.selected_filiere &&
          filiere._annee === this.selected_annee
        ) {
          this.etudiant = filiere.chercher_etudiant(ine);
        }
      }

      this.ine = this.etudiant._ine;
      this.selected_origine = this.etudiant._origine;
      this.selected_poursuite = this.etudiant._poursuite;
      this.selected_s1 = this.etudiant.semestres._semestreUn;
      this.selected_s2 = this.etudiant.semestres._semestreDeux;
      this.selected_reussite=this.etudiant._reussite;
    },

    //charger tous les annees et les filieres du fichier, apres elle supprime les double 
    filtrage_annee_filiere() {
      for (let filiere of this.filieres) {
        this.filieres_affich.push(filiere._nom);
        this.annees_affich.push(filiere._annee);
      }
      for (let i = 0; i < this.filieres_affich.length; i++) {
        for (let j = i + 1; j < this.filieres_affich.length; j++) {
          if (this.filieres_affich[i] === this.filieres_affich[j]) {
            this.filieres_affich.splice(j, 1);
          }
        }
      }
      for (let i = 0; i < this.annees_affich.length; i++) {
        for (let j = i + 1; j < this.annees_affich.length; j++) {
          if (this.annees_affich[i] === this.annees_affich[j]) {
            this.annees_affich.splice(j, 1);
          }
        }
      }
    },

  // la methode qui permet de telecharger le fichier final
    sauvegarder() {
      const data = JSON.stringify(this.filieres);
      let blob = new Blob([data], { type: "text/plain;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, "Statistiques.json");
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "Statistiques.json");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },

    //ajouter un etudiant à la bd, apres vider les champs et charger le tableau d'affichage 
    ajouter() {
      for (let filiere of this.filieres) {
        if (
          filiere._nom === this.selected_filiere &&
          filiere._annee === this.selected_annee
        ) {
          filiere.ajouter_etudiant(
            this.ine,
            this.selected_origine,
            new Semestre(this.selected_s1, this.selected_s2), 
            this.selected_poursuite,
            this.selected_reussite
          );
        }
      }
      this.vider();
      this.chercher();
    },

    //modification des informations de l'etudiant selectionné
    modifier() {
      for (let filiere of this.filieres) {
        if (
          filiere._nom === this.selected_filiere &&
          filiere._annee === this.selected_annee
        ) {
          filiere.modifier_etudiant(
            this.ine,
            this.selected_origine,
            new Semestre(this.selected_s1, this.selected_s2),
            this.selected_poursuite,
            this.selected_reussite
          );
        }
      }

      this.vider();
    },

    //suppression des informations de l'etudiant selectionné
    Supprimer() {
      for (let i = 0; i < this.filieres.length; i++) {
        for (let j = 0; j < this.filieres[i].etudiants.length; j++) {
          if (this.ine === this.filieres[i].etudiants[j]._ine) {
            //this.filieres[i].etudiants[j].delete();
            this.filieres[i].etudiants.splice(j, 1);
            //delete this.filieres[i].etudiants[j];
            //console.log(this.filieres[i].etudiants[j]._ine);
          }
        }
      }
      this.vider();
      this.chercher();
    },
    //vider les champs de la formulaire apres une action
    vider() {
      this.modification_acive = false;
      this.ine = "";
      this.selected_origine = "";
      this.selected_s1 = "";
      this.selected_s2 = "";
      this.selected_poursuite = "";
      this.selected_reussite= "";
    },

    //methode qui charge les données du fichier dans des tableaux pour faciliter la manipulation
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
  },
};
</script>