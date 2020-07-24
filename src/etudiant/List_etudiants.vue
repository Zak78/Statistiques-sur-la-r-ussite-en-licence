<template>

<div>
  <div class="container">
    <div class="row">
        <div class="col-md-6">
          <router-view></router-view>
        </div>
        <div class="col-md-6" id="listR">
         <h4>Recherche du list par : </h4>
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
        <label for="inputState">Année scolaire :   </label>
        <select  class="form-control">
            <option>2020/2021</option>
      <option >2019/2020</option>
      <option >2018/2019</option>
      <option >2017/2018</option>
        </select>
        
      </div>
      <button type="button" class="btn btn-success" @click="onTest">Chercher</button>
      
      
    </div>
    <div>
      <!--   <div v-for="data in myJson" :key="data"> {{data}}</div>-->
        </div>
     </div>

    </div>
  </div>
<div>

</div>

</div>
</template>

<script>
          import MY_JSON from '../data.json'
          export default{ 
            data(){
            return {
                 myJson: MY_JSON,
            }
            },
            methods :{
              onTest(){
                console.log(JSON.stringify(this.myJson));
              }
            }
          }

          
          
    </script>
