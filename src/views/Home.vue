<template>
<div>
  <HomeComponent/>
</div>
</template>

<script>
import HomeComponent from "../components/HomeComponent";

export default {
  name: "Home",
  components: {HomeComponent},
  async mounted(){
    if (this.$store.state.dogsArr.length <= 0){
      this.$store.state.loadingGifShow = true;

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
      this.$store.state.dogsArr = breedInfoObject;

      this.$store.state.loadingGifShow = false;
    }
  },
}
</script>

<style scoped>

</style>