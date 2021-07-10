<template>
  <div class="container px-4 inputDiv">
    <div class="row gx-5">
      <div class="col">
        <div class="p-2 border bg-light">
          <h3 id="breedQuestion">How many breeds do you want to compare?</h3>
          <input id="inputNum" type="number" v-model.number="inputNumber">
        </div>
      </div>
    </div>
  </div>
<div>
  <div v-if="inputNumber > 0" v-for="n in inputNumber">
    <SearchComponent/>
  </div>
</div>
</template>

<script>
import SearchComponent from "../components/SearchComponent";

export default {
  name: "Search",
  components: {SearchComponent},
  data(){
    return {
      inputNumber : 3
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
          console.log(breedInfoObject);
        }
      } catch {
        console.log('Connection error');
      }
      this.$store.state.dogsArr = breedInfoObject;

      this.$store.state.loadingGifShow = false;
    }


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
  },
  methods : {
  }
}
</script>

<style scoped>
.inputDiv {
  padding-top: 6em;
}

#breedQuestion {
  margin-right: 1em;
}

#inputNum {
  text-align: center;
}

div {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>