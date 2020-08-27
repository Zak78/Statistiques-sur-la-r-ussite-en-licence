<template>
  <div class="all">
    <div class="divRech">
      <div class="divRech1">

        <!-- parcourir et telecharger le fichier apres les modifications-->
        <input type="file" value="Parcourir" accept="application/json" @change="onFileChange" id="inputFile"/>
        <button type="button" class="btn btn-outline-warning" id="btnSauvegarder" @click="sauvegarder">Sauvegarder</button>
      </div>
    </div>
<!--formulaire de l'année et de la filiere -->
    <div class="row">
      <div class="col-lg-5">
        <form>
          <div class="form-row">
            <div class="form-group col-md-4" id="NomFiliere">
              <label>Filiére :</label>
              <input type="text" v-model="selectedFiliere" />
            </div>

            <div class="form-group col-md-4" id="yearFiliere">
              <label>Année scolaire :</label>
              <input type="text" placeholder="EX : 20XX-20XY" v-model="selectedAnnee" />
            </div>
          </div>

          <br />
          <button type="button" class="btn btn-outline-warning" @click="ajouter">ajouter</button>
          <button type="button" class="btn btn-outline-warning">modifier</button>
          <button type="button" class="btn btn-outline-warning" @click="supprimer">Supprimer</button>
        </form>
      </div>

      <div class="col-lg-6">
        <table id="tableResultat">
          <thead>
            <tr>
              <th>Nom de filiére :</th>
              <th>Année scolaire :</th>
            </tr>
          </thead>
          <!-- affichage des années et des filieres du fichier selectionné dans un tableau -->
          <tr v-for="(value,v) in filieres" :key="v">
            <td @click="remplir_form(value._nom,value._annee)" id="hoverCurseur">{{value._nom}}</td>
            <td>{{value._annee}}</td>
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
      selectedFiliere: "",
      selectedAnnee: "",
      filieres: new Array(),
      etudiants: new Array(),
      semestre: Object,
      filiere: Object,
      etudiant: Object,
    };
  },

  methods: {
    ajouter() {
      let etudiants = [];
      this.filiere = new Filiere(
        this.selectedFiliere,
        this.selectedAnnee,
        etudiants
      );
      this.filieres.push(this.filiere);
      this.vider();
    },
    supprimer() {
      for (let j = 0; j < this.filieres.length; j++) {
        if (
          this.filieres[j]._annee === this.selectedAnnee &&
          this.filieres[j]._nom === this.selectedFiliere
        ) {
          this.filieres.splice(j, 1);
        }
      }
      this.vider();
    },
    vider() {
      this.selectedFiliere = "";
      this.selectedAnnee = "";
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
      };
      reader.readAsText(file);
    },

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
    // affichage des info dans la formulaire pour pouvoir les manipuler 
    remplir_form(nom, annee) {
      this.selectedAnnee = annee;
      this.selectedFiliere = nom;
    },

    //remplir les données du fichier dans des tableaux pour pouvoir les traiter 
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