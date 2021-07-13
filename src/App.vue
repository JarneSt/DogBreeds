<template>
  <div>
    <div id="nav" >
      <div class="d-flex">
          <i id="dogIcon" class="fas fa-dog"></i><h1 id="logo" data-v-0d0ccf2f="">DOGS</h1>
      </div>
      <div id="somedogs">
        <router-link to='/about'>About</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/search">Compare</router-link>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<style>
* {
  font-family: "Poppins Light", sans-serif !important;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
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


#nav {
  background: #e6e6e6;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  padding: 13px;
}

#nav div {
  margin-top: auto;
  margin-bottom: auto;
}

#logo {
  color: crimson;
  text-shadow: 0px 0px 2px black;
  font-size: 46px;
  text-decoration: none;
  justify-content: flex-start;
  margin-top: auto;
  margin-bottom: auto;
  padding: 6px;
}

#somedogs a {
  font-weight: bold;
  background: white;
  padding: 20px;
  width: 140px;
  text-align: center;
  border-radius: 10px 10px 10px 10px;
  margin-left: 10px;
  text-decoration: none;
}

#nav div a:hover {
box-shadow: 0 0 4px 0 crimson;
}

#somedogs {
  width: 100%;
  text-align: right;
  font-size: 17px !important;
}

#somedogs a{
  margin-right: 10px;
}

#dogIcon {
  font-size: 58px;
  color: crimson;
  filter: drop-shadow(0px 1px 1px black);
}


@media only screen and (max-width: 720px){
  #nav div a {
    margin: 3px;
  }

  #logo {
    display: none;
  }

  #somedogs {
    font-size: 12px !important;
  }

}
</style>



