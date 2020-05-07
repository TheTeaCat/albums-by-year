<template>
  <div class="library">
      <ol v-if="loaded">
        {{ sortedAlbumYears }}
        <Year v-for="year in sortedAlbumYears" :key="year"
        :year="year"
        :albums="albumsByYear[year].albums"
        :access_token="access_token" />
      </ol>
  </div>
</template>

<script>
import axios from "axios"
import Year from "./Year.vue";

export default {
  components: {
    Year
  },

  props: ["access_token"],

  data() { return {
      albumsByYear: {},
      loaded: false
  }},
  
  computed: {
    request_url() {
      return "https://api.spotify.com/v1/me/albums?" +
      "access_token=" + this.access_token +
      "&limit=50" +
      "&offset=0"
    },
    sortedAlbumYears() {
      return Object.keys(this.albumsByYear).sort((a,b)=>{return b-a})
    }
  },

  mounted() {
    console.log(this.request_url)
    axios.get(this.request_url)
      .then(
        function(data) {
          data = data["data"]["items"]
          for (var album of data) {
            const releaseYear = album["album"]["release_date"].split("-")[0]
            this.albumsByYear[releaseYear] ? null : this.albumsByYear[releaseYear] = { year: releaseYear, albums: [] }
            this.albumsByYear[releaseYear]["albums"].push(album)
          }
          this.loaded = true;
          console.log(this.albumsByYear)
        }.bind(this)
      )

  },
}
</script>

<style lang="scss" scoped>
</style>
