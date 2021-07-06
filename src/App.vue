<template>
  <div class="NavBtns">
    <h1 id="logo">Dogs</h1>
  </div>
  <div id="nav" >
    <div id="somedogs">
      <router-link to="/">Some Dogs</router-link>
    </div>
    <div>
      <router-link to="/search">Search</router-link>
    </div>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: crimson;
}
</style>

<style scoped>
.NavBtns {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #e6e6e6;
  padding-top: 9px;
}


#nav {
  background: #e6e6e6;
  display: flex;
  font-family: 'ABeeZee', sans-serif;
}
#logo {
  color: crimson;
  justify-content: flex-start;
  font-size: 51px;
  text-decoration: none;
}

#nav div a {
  background: white;
  font-weight: bold;
  border-radius: 10px 10px 10px 10px;
  padding: 20px;
}

#nav div a:hover {
box-shadow: 0 0 4px 0 crimson;
}

#somedogs{
  margin-right: 10px;
}
</style>



