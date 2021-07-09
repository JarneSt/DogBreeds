<template>
  <div v-if="loadingGif">
    <img src="../assets/loadingGif.gif" />
    <h2>Loading ...</h2>
  </div>
  <div v-else>
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
          <img :src="dog.image" class="d-block w-100"/>
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
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
  async mounted(){

    //FIRST
    let dogUrl = 'https://dog.ceo/api/breeds/image/random';
    let dogObject;

    if (this.$store.state.dogsArr.length <= 0){
      this.$store.state.loadingGifShow = true;
      for (let i = 0; i < 50; i++)
      {
        try {
          let response = await fetch(dogUrl, {
            method : 'GET'
          });

          if (response.status === 200) {
            dogObject = await response.json();
          }
        } catch {
          console.log('Connection error');
        }

        //console.log(dogObject);
        let dogname = dogObject.message.substr(30,20).split('/');
        let dog = {
          name : dogname[0].charAt(0).toUpperCase() + dogname[0].slice(1),
          image : dogObject.message
        }

        this.$store.state.dogsArr.push(dog);
      }

      this.$store.state.loadingGifShow = false;

      //console.table('dogs array',this.$store.state.dogsArr);



      //THEN

      let breedInfoUrl = 'https://api.thedogapi.com/v1/breeds/';
      let breedInfoObject = [];

      try {
        let response = await fetch(breedInfoUrl, {
          method : 'GET'
        });

        if (response.status === 200) {
          breedInfoObject = await response.json();
          console.log(breedInfoObject);
        }
      } catch {
        console.log('Connection error');
      }

    }
  },
  computed : {
    dogs(){
      return this.$store.state.dogsArr;
    },
    loadingGif(){
      return this.$store.state.loadingGifShow;
    }
  }
}
</script>

<style scoped>


.slideRectangles, .activeRectangle {
  display: none;
}
.dogImgs {
}

img {
  height: 10% !important;
  width: 30% !important;
  margin: auto;
}

h1 {
  padding-bottom: 2em;
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

@media only screen and (max-width: 1000px){
  img {
    width: 69% !important;
  }
}

</style>