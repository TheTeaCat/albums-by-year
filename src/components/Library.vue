<template>
  <div class="library">
    <div class="loading" v-if="!loaded">
      <h1>Loading<LoadingEllipsis /></h1>
    </div>
    <div v-else>
      <h1>
        <a :href="profile.external_urls.spotify" class="username"
          >{{ profile.display_name }}</a>{{ profile.display_name[-1] == 's' ? '\'' : '\'s' }}
          saved albums, by year<span>!</span>
        </h1>
      <ToggleGroup :options="album_types" :title="'Release Types'"/>
      <ol>
        <Year v-for="year in sortedAlbumYears" :key="year"
        :year="year"
        :albums="albumsByYear[year].albums"
        :album_types="album_types"
        :access_token="access_token" />
      </ol>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import LoadingEllipsis from "./LoadingEllipsis.vue";
import ToggleGroup from "./ToggleGroup.vue";
import Year from "./Year.vue";

export default {
  components: {
    LoadingEllipsis,
    ToggleGroup,
    Year
  },

  props: ["access_token"],

  data() { return {
      albumsByYear: null,
      profile: null,
      album_types: {"album": 
                    { show:true, display:"Albums" },
                    "single":
                    { show:false, display:"Singles" },
                    "compilation":
                    { show:false, display:"Compilations" }
                    },
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
    },
    loaded() {
      return this.albumsByYear && this.profile
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
.library { width:100%; }
h1 { margin: $spacer 0 $spacer*4 0; }

.loading {
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
