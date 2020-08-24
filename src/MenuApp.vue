<template>
  <div id="app">
    <ul>
  <li @click="avertissement"><router-link to="/#"><a>Acceuil</a></router-link></li>
  <li><router-link to="/etudiant"><a>Etudiants</a></router-link></li>
  <li><router-link to="/filieres"><a >Filiéres</a></router-link></li>
  <li><router-link to="/statistiques"><a>Statistiques</a></router-link></li>
</ul>
<br>

  <router-view>
  </router-view>
  </div>
</template>
<script>

export default{
  methods: {
      avertissement ()
      {
        alert('vos données vont etre perdu ! ');
      }
  }
}
</script>
