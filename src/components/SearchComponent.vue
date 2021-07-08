<template>
<div>
  <div class="form">
    <select @change="breedSearch" v-model="selectedValue" class="dog-selector" >
      <option :id="breed" v-for="breed in breedArray" :value="breed">{{ breed }}</option>
    </select>
    <button @click="breedSearch">Renew</button>
  </div>
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
  </div>
</div>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      selectedValue : ''
    }
  },
  methods : {
    kpHandler(e){
      if (e.key === 'Enter')
        this.breedSearch();
    },
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
    async breedSearch(){
      this.$store.state.searchArr = [];

      let userInput = this.selectedValue;
      let dogUrl = `https://dog.ceo/api/breed/${userInput}/images/random`;
      let dogObject;

      this.$store.state.loadingGifShow = true;

      for (let i = 0; i < 20; i++)
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

        let dogname = dogObject.message.substr(30,20).split('/');
        let dog = {
          name : dogname[0].charAt(0).toUpperCase() + dogname[0].slice(1),
          image : dogObject.message
        }

        this.$store.state.searchArr.push(dog);
      }

      let data = Array.from(new Set(this.$store.state.searchArr.map(JSON.stringify))).map(JSON.parse);

      this.$store.state.searchArr = data;



      this.$store.state.loadingGifShow = false;
    }
  },
  async mounted(){
    let dogUrl = `https://dog.ceo/api/breeds/list/all`;
    let breedObject;

    if (this.$store.state.breedArr.length <= 0){
      this.$store.state.loadingGifShow = true;

      try {
        let response = await fetch(dogUrl, {
          method : 'GET'
        });

        if (response.status === 200) {
          breedObject = await response.json();
        }
      } catch {
        console.log('Connection error');
      }

      for(let breed in breedObject.message){
        this.$store.state.breedArr.push(breed);
      }

      this.$store.state.loadingGifShow = false;
    }

    this.selectedValue = 'affenpinscher';
    await this.breedSearch();
  },
  computed :{
    breedArray(){
      return this.$store.state.breedArr;
    },
    searchArray(){
      return this.$store.state.searchArr;
    }
  }
}
</script>

<style scoped>
.imgalign {
  margin-top: auto;
  margin-bottom: auto;
}

.form {
  padding: 25px;
}
.row>* {
  width: 50% !important;
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