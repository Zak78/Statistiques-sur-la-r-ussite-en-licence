<template>
  <div id="app">
    <ul>
  <li><router-link to="/#"><a>Acceuil</a></router-link></li>
  <li><router-link to="/etudiant"><a>Etudiants</a></router-link></li>
  <li><router-link to="/#"><a >Filiéres</a></router-link></li>
  <li><router-link to="/#"><a>Statistiques</a></router-link></li>
</ul>
<br>
  <router-view>
  </router-view>
  </div>
</template>
<script>

export default{
}
</script>
