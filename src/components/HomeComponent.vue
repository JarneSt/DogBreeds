<template>
  <div v-if="loadingGif" class="loadingGif">
    <img src="../assets/loadingGif.gif" />
    <h2>Loading ...</h2>
  </div>
  <div v-else>

    <!--Header-->
    <div class="toast align-items-center text-white border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex text">
        <div class="toast-body">
          <b>All breeds</b>
        </div>
      </div>
    </div>


    <!--Breed search-->
    <div class="breedSearchFullDiv">
      <h5>Search breed</h5>
      <div class="input-group mb-3 inputBreedDiv">
        <input class="form-control" id="searchDog" placeholder="breed" aria-label="Breed" v-model="searchedDog" style="text-align: center">
      </div>
    </div>



    <!--Renders searched dogs-->
    <div class="container" v-if="filteredDogos.length > 0">
      <div class="row align-items-start">
        <div class="col" v-for="dog in filteredDogos">
          <div class="fullDogDiv">
            <img :src="dog.image.url">
            <p>{{dog.name}}</p>
            <div class="flex-column d-flex m-auto dogBtns" >
              <a class="btn" :href="`https://nl.wikipedia.org/wiki/${dog.name}`" target="_blank">Information</a>
              <a class="btn" :href="`https://nl.wikipedia.org/wiki/${dog.name}`" target="_blank">Wikipedia</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "HomeComponent",
  data(){
    return {
      searchedDog : '',
      currentSelectedDog : []
    }
  },
  computed : {
    filteredDogos() {
      if (!this.searchedDog) return this.$store.state.dogsArr;

      return this.$store.state.dogsArr.filter(dogsArr =>
          (dogsArr.name.toLowerCase()).includes(this.searchedDog.toLowerCase())
      );
    },
    dogs(){
      return this.$store.state.dogsArr;
    },
    loadingGif(){
      return this.$store.state.loadingGifShow;
    }
  },
}
</script>

<style scoped>

.text {
  font-size: 23px;
}
.toast:not(.showing):not(.show) {
  opacity: inherit;
}

.toast {
  width: 100%;
  background: #e75870;
}

.toast-body {
  margin: auto;
}

.toast-body b {
  font-size: 2rem;
}

.inputBreedDiv {
  margin: auto;
  width: 60%;
}


.col {
  flex: 1 0 10% !important;
  margin-bottom: 30px;
  padding: 10px;
  border-bottom: 1px solid lightgray;
}

img {
  height: 10% !important;
  width: 30% !important;
  margin: auto;
}


.carousel-item h1 {
  color: black;
  padding: 20px;
}

button {
  background: crimson;
}

img {
  max-width: 300px;
  height: auto;
  max-height: 300px;
  margin-bottom: 1rem;
}

.col img {
  min-height: 200px !important;
  min-width: 300px !important;
  border-radius: 10px 10px 10px 10px;
}

.breedSearchFullDiv {
  margin-top: 3em;
}

.loadingGif {

}

.btn {
  background: #e6e6e6 !important;
  color: black;
}

.dogBtns {
  width: 20em;
}

.dogBtns a {
  margin-bottom: 5px;
}

.fullDogDiv{
  /*
  box-shadow: 0 0 4px 0 #444444;

   */
  border-radius: 20px 20px 20px 20px;
  min-height: 30em;
  display: flex;
  flex-direction: column;
}

.fullDogDiv p {
  font-size: 25px;
}

@media only screen and (max-width: 1000px){
  img {
    width: 69% !important;
  }
}

@media only screen and (min-width: 900px){
  .inputBreedDiv {
    margin: auto;
    width: 30%;
  }
}

</style>