<template>
<div>
  <div class="form">
    <h1>Choose breed</h1>
    <select @change="breedOtherImages" v-model="selectedValue" class="dog-selector" >
      <option :id="breed" v-for="breed in breedArray" :value="breed">{{ breed }}</option>
    </select>
  </div>

  <div class="cardDiv">
    <div v-if="dogObject.length > 0" class="card" style="width: 18rem;">
      <img :src="dogObject[0].image.url" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="card-title"><b>{{dogObject[0].name}}</b></h2>
        <p class="card-text">{{dogObject[0].description}}</p>
        <h5 class="card-title">Temperament</h5>
        <p class="card-text">{{dogObject[0].temperament}}</p>
        <h5 class="card-title">Life Span</h5>
        <p class="card-text">{{dogObject[0].life_span}}</p>
        <h5 class="card-title">Weight</h5>
        <p class="card-text">{{dogObject[0].weight.metric}} kg</p>
        <h5 class="card-title">Height</h5>
        <p class="card-text">{{dogObject[0].height.metric}} cm</p>
        <div class="d-flex flex-column dogBtns">
          <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">More Pictures</a>
          <a href="#" class="btn btn-danger">More Information</a>
        </div>
      </div>
    </div>
  </div>
  <!--
  <div class="container px-4">
    <div class="row gx-5">
      <div v-for="img in searchArray" class="imgalign">
        <div class="col">
          <div class="p-3 border imgbg">
            <img :alt="img.name" :src="img.image">
            <input style="padding: 5px; margin-top: 20px" type="button" @click="downloadImage(img.image)" value="Download">
          </div>
        </div>
      </div>
    </div>
    <button @click="breedOtherImages">Renew</button>
  </div>
  -->


  <!-- Modal -->
  <div v-if="dogObject.length > 0" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">More pictures of {{dogObject[0].name}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container px-4">
            <div class="row gx-5">
              <div v-for="img in searchArray" class="imgalign">
                <div class="col">
                  <div class="p-3 border imgbg">
                    <img :alt="img.name" :src="img.image">
                    <input style="padding: 5px; margin-top: 20px" type="button" @click="downloadImage(img.image)" value="Download">
                  </div>
                </div>
              </div>
            </div>
            <button @click="breedOtherImages">Renew</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
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
      dogObject : {}
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
       * IF OTHER OPTION IS SELECTED, THIS FUNCTION WILL EXECUTE
       */


      let selectedDogObj = {};
      selectedDogObj = this.$store.state.dogsArr.filter(dogsArr => dogsArr.name === this.selectedValue);
      this.dogObject = (selectedDogObj);
      console.log(this.dogObject);



      /**
       * CLEARING SEARCH ARRAY SO WE DO NOT APPEND RESULTS OF PREVIOUS SEARCH RESULTS
       */
      this.$store.state.searchArr = [];



      /**
       * SHOW IMAGES OF SELECTED BREED (OPTIONAL)
       */

      let userInput = this.selectedValue;
      let dogUrl = `https://dog.ceo/api/breed/${userInput.toLowerCase()}/images/random`;
      let dogObject;

      this.$store.state.loadingGifShow = true;

      let response = await fetch(dogUrl);
      if (response.status === 200){
        for (let i = 0; i < 20; i++)
        {
          let response = await fetch(dogUrl, {
            method : 'GET'
          });

          if (response.status === 200) {
            dogObject = await response.json();
          }

          console.log(dogObject);
          if (dogObject !== null){
            let dogname = dogObject.message.substr(30,20).split('/');
            let dog = {
              name : dogname[0].charAt(0).toUpperCase() + dogname[0].slice(1),
              image : dogObject.message
            }
            this.$store.state.searchArr.push(dog);
          }
        }

        let data = Array.from(new Set(this.$store.state.searchArr.map(JSON.stringify))).map(JSON.parse);
        this.$store.state.searchArr = data;
      }
      this.$store.state.loadingGifShow = false;




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
    searchArray(){
      return this.$store.state.searchArr;
    },
    dogsArray(){
      return this.$store.state.dogsArr;
    }
  }
}
</script>

<style scoped>
.imgalign {
  margin-top: auto;
  margin-bottom: auto;
}

.dogBtns a {
  margin-top: 5px;
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
.row>* {
  width: 50% !important;
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

@media only screen and (min-width: 1400px){
  .p-3 {
    max-width: 50%;
  }

}
</style>