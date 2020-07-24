<template>

<div>
    <h1>Modifier Etudiants : </h1>
<div>
  <form >
    <div class="form-row">
     <div class="form-group col-md-4">
        <label for="inputState">Filiére :  </label>
        <select id="inputState" class="form-control">
           <option>L1</option>
      <option >L2</option>
      <option >L3 INFO</option>
      <option >L3 MIAGE</option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label >Année scolaire :   </label>
        <select  class="form-control">
            <option>2020/2021</option>
      <option >2019/2020</option>
      <option >2018/2019</option>
      <option >2017/2018</option>
        </select>
      </div>
    </div>

         <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" > INE </span>
    </div>
    <input type="text" class="form-control" id="ine_w">
  </div>


     <div class="form-row">
     <div class="form-group col-md-4">
        <label >Origine : </label>
        <select  class="form-control" v-model="selected" >
          <option>L2</option>
      <option value="Redoublants" >Redoublants</option>
      <option value="DUT">DUT</option>
      <option value="Etrangers">Etrangers</option>
      <option value="Autres">Autres</option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label >Autres : </label>
        <input type="text"  class="form-control" >
      </div>
    </div>
    <div class="form-row">
     <div class="form-group col-md-4">
        <label >Semestre 1:  </label>
        <select  class="form-control">
           <option>Admis </option>
      <option >Ajournes </option>
      <option >Defaillants </option>
      <option >En cours </option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label >Semestre 2 :   </label>
        <select class="form-control">
          <option>Admis </option>
     <option >Ajournes </option>
     <option >Defaillants </option>
     <option >En cours </option>
        </select>
      </div>
      <div class="form-group col-md-4">
         <label >Poursuite  : </label>
         <select class="form-control">
           <option> Oui </option>
           <option > Non </option>

         </select>
       </div>
    </div><br>
<button type="button" class="btn btn-outline-warning" > Modifier </button>


          </form>


</div>
</div>
</template>

<script>
export default{

}
</script>
