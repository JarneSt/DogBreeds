<template>
<div>
  <div class="form">
    <h1>Choose breed</h1>
    <select @change="breedOtherImages" v-model="selectedValue" class="dog-selector" >
      <option :id="breed" v-for="breed in breedArray" :value="breed">{{ breed }}</option>
    </select>
    <div class="cardDiv">
      <div v-if="dogObject.length > 0" class="card" style="width: 18rem;">
        <img :src="dogObject[0].image.url" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title"><b>{{dogObject[0].name}}</b></h2>
          <h5 class="card-title">Temperament</h5>
          <p class="card-text">{{dogObject[0].temperament}}</p>
          <h5 class="card-title">Life Span</h5>
          <p class="card-text">{{dogObject[0].life_span}}</p>
          <h5 class="card-title">Weight</h5>
          <p class="card-text">{{dogObject[0].weight.metric}} kg</p>
          <h5 class="card-title">Height</h5>
          <p class="card-text">{{dogObject[0].height.metric}} cm</p>
          <a class="btn btn-danger" :href="`https://nl.wikipedia.org/wiki/${dogObject[0].name}`" target="_blank">Wikipedia</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "SearchComponent",
  components: {},
  data() {
    return {
      selectedValue : 'Affenpinscher',
      dogObject : {},
      searchArray : []
    }
  },
  methods : {
    async downloadImage(imageSrc) {
      const image = await fetch(imageSrc)
      const imageBlog = await image.blob()
      const imageURL = URL.createObjectURL(imageBlog)

      let index = this.$store.state.searchArr.findIndex(x => x.image === imageSrc);

      //Download image
      const link = document.createElement('a')
      link.href = imageURL
      link.download = this.$store.state.searchArr[index].name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    async breedOtherImages(){
      /**
       * CLEARING SEARCH ARRAY SO WE DO NOT APPEND RESULTS OF PREVIOUS SEARCH RESULTS
       */
      this.searchArray = [];

      console.log('Dogs Array',this.$store.state.dogsArr);
      let selectedDogObj = {};
      selectedDogObj = this.$store.state.dogsArr.filter(dogsArr => dogsArr.name === this.selectedValue);
      this.dogObject = (selectedDogObj);
      console.log('Dog Object',this.dogObject);







      /**
       * SHOW IMAGES OF SELECTED BREED (OPTIONAL)
       */

      /*

      let userInput = this.dogObject[0].name;
      let dogUrl = `https://dog.ceo/api/breed/${userInput.toLowerCase()}/images/random`;
      let dogObject;

      this.$store.state.loadingGifShow = true;

      let response;
      try {
        response = await fetch(dogUrl);
      }catch (e) {
        console.log(e);
      }

      if (response.status === 200){
        for (let i = 0; i < 20; i++)
        {
          let response = await fetch(dogUrl, {
            method : 'GET'
          });

          if (response.status === 200) {
            dogObject = await response.json();
          }

          if (dogObject !== null){
            let dogname = dogObject.message.substr(30,20).split('/');
            let dog = {
              name : dogname[0].charAt(0).toUpperCase() + dogname[0].slice(1),
              image : dogObject.message
            }
            this.searchArray.push(dog);
          }
        }

        let data = Array.from(new Set(this.searchArray.map(JSON.stringify))).map(JSON.parse);
        this.searchArray = data;
      }
      this.$store.state.loadingGifShow = false;


      console.log('searchArray',this.searchArray);


      let a = document.createElement('a');
      a.className = 'btn btn-danger';
      a.href = `https://nl.wikipedia.org/wiki/${dogObject[0].name}`;

      document.querySelector('.wikipediaBtn').appendChild(a);
      */

    }
  },
  async mounted(){

    let breedInfoObject = [];
    /**
     * FILL DOGS ARRAY WITH INFORMATION
     */
    if (this.$store.state.dogsArr.length <= 0){
      this.$store.state.loadingGifShow = true;

      let breedInfoUrl = 'https://api.thedogapi.com/v1/breeds/';


      try {
        let response = await fetch(breedInfoUrl, {
          method : 'GET'
        });

        if (response.status === 200) {
          breedInfoObject = await response.json();
        }
      } catch {
        console.log('Connection error');
      }
      this.$store.state.dogsArr = breedInfoObject;

      this.$store.state.loadingGifShow = false;
    }

    let selectedDogObj = {};
    selectedDogObj = this.$store.state.dogsArr.filter(dogsArr => dogsArr.name === this.selectedValue);
    this.dogObject = (selectedDogObj);

    /**
     * RETRIEVE BREED INFORMATION AND PUT THEM IN BREED ARRAY
     */

    if (this.$store.state.breedArr.length <= 0){
      this.$store.state.loadingGifShow = true;

      for (let i = 0; i < this.$store.state.dogsArr.length; i++)
      {
        this.$store.state.breedArr.push(this.$store.state.dogsArr[i].name)
      }

      this.$store.state.loadingGifShow = false;
    }


    /**
     * RETRIEVE OTHER IMAGES FROM SPECIFIC BREED
     */
    await this.breedOtherImages();

  },
  computed :{
    breedArray(){
      return this.$store.state.breedArr;
    },
    dogsArray(){
      return this.$store.state.dogsArr;
    }
  }
}
</script>

<style scoped>
h5.card-title {
  font-weight: bold;
}


/*
img {
  width: 50%;
  margin: auto;
}

 */

.form {
  width: 75%;
}



.imgalign {
  margin-top: auto;
  margin-bottom: auto;
}


.dogBtns a {
  margin-top: 5px;
}

.dog-selector {
  width: 24em;
  text-align: center;
}

#headImgDog {
  max-width: 100%;
  height: auto;
  max-height: 300px;
}


.cardDiv {
  display: flex;
  justify-content: center;
}

.form {
  padding: 25px;
}

.card {
  width: 34em !important;
}

.p-3 {
  flex-direction: column;
  display: flex;
  max-width: 80%;
  margin: auto;
}

.p-3 img {
  max-width: 100%;
}


select {
  padding: 15px;
}

button {
  padding: 11px;
}

.row>* {
  width: 50% !important;
}

@media only screen and (min-width: 1400px){
  .p-3 {
    max-width: 50%;
  }

}

@media only screen and (min-width: 750px){
  .modal-dialog {
    max-width: 50%;
  }
}

@media only screen and (max-width: 500px){
  .dog-selector {
    width: inherit;
  }

  .cardDiv{
    width: 59%;
    margin: auto;
  }

  .modal-dialog {
    max-width: inherit;
  }

  .modal-footer {
    justify-content: center;
  }
}


</style>