<template>
  <div v-if="loadingGif">
    <img src="../assets/loadingGif.gif" />
    <h2>Loading ...</h2>
  </div>
  <div v-else>
    <h1 id="allBreedTitle"><b>All breeds</b></h1>
    <hr>

    <!--
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators"  class="active activeRectangle"
                aria-current="true" ></button>
        <div v-for="(dog,index) in dogs">
          <button class="slideRectangles" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="`${index}`"
                   :aria-label="`Slide ${index}`"></button>
        </div>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/shutterstock_1290320698.webp" />
        </div>
        <div class="carousel-item dogImgs" v-for="dog in dogs">
          <h1>{{dog.name}}</h1>
          <img :src="dog.image.url" class="d-block w-100"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" title="Previous dog" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" title="Next dog" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    -->











    <h5>Search breed</h5>

    <div class="input-group mb-3 inputBreedDiv">
      <input class="form-control" id="searchDog" placeholder="breed" aria-label="Breed" v-model="searchedDog" v-on:input="showSearchedDog($event)" style="text-align: center">
    </div>


    <!--
    <div class="d-flex flex-wrap">
      <div v-if="currentSelectedDog.length > 0" style="padding: 20px" v-for="dog in currentSelectedDog">
        <div class="col">
          <img :src="dog.image.url">
          <p>{{dog.name}}</p>
          <a class="btn btn-danger" :href="`https://nl.wikipedia.org/wiki/${dog.name}`" target="_blank">Information</a>
        </div>
      </div>
    </div>
    -->





    <div class="container" v-if="currentSelectedDog.length > 0"  style="padding: 20px">
      <div class="row align-items-start">
        <div class="col" v-for="dog in currentSelectedDog">
          <img :src="dog.image.url">
          <p>{{dog.name}}</p>
          <a class="btn btn-danger" :href="`https://nl.wikipedia.org/wiki/${dog.name}`" target="_blank">Information</a>
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
  methods : {
    showSearchedDog(){
      let selectedDogArray = [];

      let filteredDogArrayByName = this.dogs.filter(dogsArr => (dogsArr.name.toLowerCase()).includes(this.searchedDog.toLowerCase()));

      if (this.searchedDog === ''){
        //Show all dogs if input is empty
        selectedDogArray = this.dogs;
        this.currentSelectedDog = (selectedDogArray);
      }
      else{
        //Show dogs that include user input
        selectedDogArray = filteredDogArrayByName;
        this.currentSelectedDog = (selectedDogArray);
      }
    }
  },
  mounted() {
    this.showSearchedDog();
  },
  computed : {
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

.inputBreedDiv {
  margin: auto;
  width: 60%;
}

.slideRectangles, .activeRectangle {
  display: none;
}
.dogImgs {
}

.col {
  flex: 1 0 40% !important;
  margin-bottom: 30px;
  padding: 2em;
}

img {
  height: 10% !important;
  width: 30% !important;
  margin: auto;
}

#allBreedTitle {
  padding: 25px;
  color: #ed889c;
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