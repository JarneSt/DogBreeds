<template>
<div>
  <SearchComponent/>
  <SearchComponent/>
  <SearchComponent/>
</div>
</template>

<script>
import SearchComponent from "../components/SearchComponent";
export default {
  name: "Search",
  components: {SearchComponent},
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
  }
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>