<template>
    <div>
    <div id="divRech">
        <div id="divRech1">
            <div class="form-row">
     <div >
        <label id="labelFiliere"  >Filiére :  </label>
        <select id="inputFiliere" class="form-control"  v-model="selected1">
           <option  v-for="(fil,f) in filieres" :key="f">{{fil._nom}}</option>
        </select>
      </div>
      <div >
        <label id="labelYear">Année scolaire :   </label>
        <body>
        <select  id="inputYear" class="form-control"  v-model="selected">
            <option  v-for="(ann,a) in filieres" :key="a">{{ann._annee}}</option>
        </select>
        </body>
      </div>
    </div>
            </div><div id="divRech2">
<input type="file"  accept="application/json"  @change="onFileChange" />
<button class="btn btn-outline-warning" id="btnChercher" @click="rech" >Chercher</button>

            </div>
    </div>
    <div class="row"><div class="col-lg-5">
        <form >
   

         <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="ineForm" > INE </span>
    </div>
    <span v-if="test_modif=== true">
      <input type="text" class="form-control" id="ine_w" v-model="ine_w" disabled="disabled" >
      </span>
      <span v-else-if="test_modif=== false">
      <input type="text" class="form-control" id="ine_w" v-model="ine_w" >
      </span>
    
  </div>


     <div class="form-row">
     <div class="form-group col-md-4">
        <label >Origine : </label>
        <select  class="form-control" v-model="selected_or" >
      <option>L2</option>
      <option value="Redoublants" >Redoublants</option>
      <option value="DUT">DUT</option>
      <option value="Etrangers">Etrangers</option>
      <option value="Autres">Autres</option>
        </select>
      </div>
     <!-- <div class="form-group col-md-6" v-if="selected ==='Autres'" >
        <label >Autres : </label>
        <input type="text"  class="form-control" >
      </div> 
      <div v-else class="form-group col-md-6">
        <label style="display: none; ">Autres : </label>
        <input type="text" style="display: none; " class="form-control" >
      </div>-->

    </div>
    <div class="form-row">
     <div class="form-group col-md-4">
        <label >Semestre 1:  </label>
        <select  class="form-control" v-model="selected_s1" >
           <option>Admis </option>
      <option >Ajournes </option>
      <option >Defaillants </option>
      <option >En cours </option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label >Semestre 2 :   </label>
        <select class="form-control" v-model="selected_s2">
          <option>Admis </option>
     <option >Ajournes </option>
     <option >Defaillants </option>
     <option >En cours </option>
        </select>
      </div>
      <div class="form-group col-md-4">
         <label >Poursuite  : </label>
         <select class="form-control" v-model="selected_pours">
           <option> Oui </option>
           <option> OuiUHA </option>
           <option > Non </option>
         </select>
       </div>
    </div><br>
<button type="button" class="btn btn-outline-warning"   @click="Ajouter"> Ajouter </button>
<button type="button" class="btn btn-outline-warning"   @click="Modifier"> Modifier </button>
<button type="button" class="btn btn-outline-warning"   @click="Supprimer"> Supprimer </button>
<button type="button" class="btn btn-outline-warning"  @click="sauvegarder"> Sauvegarder </button>

</form>
</div>
  
    <!--  <div v-for="inf in et" :key="inf"  class="col-lg-6">
      <span v-if="selected===inf.AnneeScolaire && selected1===inf.Nom_De_Filiere">
        <tbody v-for="etud in inf.Etudiants" :key="etud">
          <tr>
            <td>{{ etud.INE}}</td>
            <td>{{ etud.Origine}}</td>
            <td>{{ etud.Semestre1 }}</td>
            <td>{{ etud.Semestre2 }}</td>
            <td>{{  etud.poursuite}}</td>
          </tr>
          </tbody>
      </span>
       </div>  -->
    <div class="col-lg-6" id="QTDiv" v-show="vrai">
      <table class="table table-striped table-dark" id="tableResultat">
  <thead>
    <tr>
      <th >INE</th>
      <th >Origine</th>
      <th >Semestre 1</th>
      <th >Semestre 2</th>
      <th >Poursuite</th>
    </tr>
   
  </thead> 
      <tr v-for="(value,v) in etud_choisi" :key="v">
      <td @click="remplir_form(value._ine)" >{{value._ine}} </td>
      <td>{{value._origine}}</td>
      <td>{{value._semestres._semestreUn}}</td>
      <td>{{value._semestres._semestreDeux}}</td>
      <td>{{value._poursuite}}</td>
      </tr> 
</table>
    </div>
  

</div>
   </div>
</template>
<script>
         // import MY_JSON from '../data.json'
         // import MY_JSON_ from '../simpleData.json'
         import Etudiant from '../../models/etudiant'
         import filiere from '../../models/filiere'
         import semestre from '../../models/semestres'
          export default{ 
            data(){
            return { 
                 vrai:false,
                 et: Array,
                 selected: '',
                 selected1: '',
                 etud_choisi:Array,
                 nvEtuds:Array,
                 etudiants: Array,
                 //s:Object,
                 filieres: Array,
                 semestre: Object,
                 filiere: Object,
                 etudiant:Object,
                 ine_w:"",
                 selected_or:"",
                 selected_s1:"",
                 selected_s2:"",
                 selected_pours:"",
                 test_modif:false,
            }
            },

methods: 
{
rech()
{
  this.vrai=true;
 this.etud_choisi= new Array(); 
 
  for(let i=0; i<this.filieres.length;i++)
  {
    if(this.selected === this.filieres[i].annee && this.selected1===this.filieres[i].nom)
    {
      for(let j=0; j<this.filieres[i].etudiants.length;j++)
      {
          this.etud_choisi[j]=this.filieres[i].etudiants[j];   
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
     reader.onload = e => {
       //console.log(e.target.result);
       this.et = JSON.parse(e.target.result);
       this.remplir();
     };
     reader.readAsText(file);
   },
   remplir_form(ine)
   { this.test_modif= true;
     this.etudiant=null;
      for(let i=0;i<this.filieres.length;i++)
    {
      for(let j=0;j<this.filieres[i].etudiants.length;j++)
      {
        if( ine === this.filieres[i].etudiants[j]._ine)
          {
            this.etudiant=this.filieres[i].etudiants[j];
            break;
          } 
      } 
    }
    this.ine_w= this.etudiant._ine;
    this.selected_or= this.etudiant._origine;
    this.selected_pours= this.etudiant._poursuite;
    this.selected_s1= this.etudiant.semestres._semestreUn;
    this.selected_s2= this.etudiant.semestres._semestreDeux;
   },
     
   sauvegarder()
   {
     const data = JSON.stringify(this.filieres)
     let blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
     if (navigator.msSaveBlob) 
     { // IE 10+
       navigator.msSaveBlob(blob, "test.json")
     } else {
     let link = document.createElement('a')
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      let url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', "test.json")
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  
     /*const data = JSON.stringify(this.filieres)
    const blob = new Blob([data], {type: 'text/plain'})
    const e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
    a.download = "test.json";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);*/
   },
   Ajouter()
   {
      this.nvEtuds=new Array();
      let nvEtudiant=new Etudiant(this.ine_w,this.selected_or,new semestre(this.selected_s1,this.selected_s2),this.selected_pours);
      this.nvEtuds.push(nvEtudiant);
      console.log(nvEtudiant._ine);
  for(let i=0; i<this.filieres.length;i++)
  {
    if(this.selected === this.filieres[i].annee && this.selected1===this.filieres[i].nom)
    {
      this.filieres[i].etudiants.push(nvEtudiant);
    }
  }
  
  //const data = JSON.stringify(this.filieres)
        //window.localStorage.setItem('fil', data);
        //console.log(JSON.parse(window.localStorage.getItem('fil')));
   },
   Modifier()
   {
     for(let i=0;i<this.filieres.length;i++)
    {
      for(let j=0;j<this.filieres[i].etudiants.length;j++)
      {
        if( this.ine_w === this.filieres[i].etudiants[j]._ine)
          {
            this.filieres[i].etudiants[j]._origine=this.selected_or;
            this.filieres[i].etudiants[j]._semestres=new semestre(this.selected_s1,this.selected_s2);
            this.filieres[i].etudiants[j]._poursuite=this.selected_pours;
          } 
      } 
    }
    this.vider();
   },
   Supprimer()
   {
     for(let i=0;i<this.filieres.length;i++)
    {
      for(let j=0;j<this.filieres[i].etudiants.length;j++)
      {
        if( this.ine_w === this.filieres[i].etudiants[j]._ine)
          {
            //this.filieres[i].etudiants[j].delete();
            this.filieres[i].etudiants.splice(j,1);
            //delete this.filieres[i].etudiants[j];
            //console.log(this.filieres[i].etudiants[j]._ine);
          } 
      }
      
    }
      this.vider();
   },

   vider()
   {
    this.test_modif= false;
     this.ine_w="";
     this.selected_or="";
     this.selected_s1="";
     this.selected_s2="";
     this.selected_pours="";
    
   },
   remplir()
   {
     this.etudiants= new Array();
     this.filieres= new Array();
     for(let i=0;i<this.et.length;i++)
     {
       for(let j=0;j<this.et[i]._etudiants.length;j++)
       {
           let un = this.et[i]._etudiants[j]._semestres._semestreUn;
           let deux= this.et[i]._etudiants[j]._semestres._semestreDeux;
           this.semestre = new semestre(un,deux);
         let Ine= this.et[i]._etudiants[j]._ine;
         let origine =this.et[i]._etudiants[j]._origine;
         let poursuite=this.et[i]._etudiants[j]._poursuite;
         this.etudiant= new Etudiant(Ine,origine,this.semestre,poursuite);
         this.etudiants[j]= this.etudiant;
       }
       let nom= this.et[i]._nom;
       let annee= this.et[i]._annee;
       this.filiere= new filiere(nom,annee,this.etudiants);
       this.filieres[i]=this.filiere;
       this.etudiants= [];
     }
   }
 }
 }

</script>