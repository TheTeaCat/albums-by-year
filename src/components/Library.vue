<template>
  <div class="library">
      <h1 v-if="profile">
        <a :href="profile.external_urls.spotify" class="username"
          >{{ profile.display_name }}</a>{{ profile.display_name == 's' ? '\'' : '\'s' }}
          saved albums, by year<span>!</span>
        </h1>
      <ol v-if="albumsByYear">
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
      albumsByYear: null,
      profile: null,
  }},
  
  computed: {
    albums_request_url() {
      return "https://api.spotify.com/v1/me/albums?" +
      "access_token=" + this.access_token +
      "&limit=50" +
      "&offset=0"
    },
    profile_request_url() {
      return "https://api.spotify.com/v1/me/?" +
      "access_token=" + this.access_token
    },
    sortedAlbumYears() {
      return Object.keys(this.albumsByYear).sort((a,b)=>{return b-a})
    }
  },

  mounted() {
    axios.get(this.albums_request_url)
      .then(
        function(data) {
          data = data["data"]["items"]
          this.albumsByYear = {}
          for (var album of data) {
            const releaseYear = album["album"]["release_date"].split("-")[0]
            this.albumsByYear[releaseYear] ? null : this.albumsByYear[releaseYear] = { year: releaseYear, albums: [] }
            this.albumsByYear[releaseYear]["albums"].push(album)
          }
        }.bind(this)
      )
    axios.get(this.profile_request_url)
      .then(
        function(data) {
          this.profile = data.data
        }.bind(this)
      )

  },
}
</script>

<style lang="scss" scoped>
h1 {
  margin: $spacer 0 $spacer*4 0;
}
.username {
  font-weight: bold;
}
span {
  color: $green;
  font-weight: bold;
}
</style>
