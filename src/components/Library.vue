<template>
  <div class="library">
    <div class="loading" v-if="!loaded">
      <h1 class="loading-title">Loading</h1>
      <p class="album-count">{{ loadedAlbums }} albums</p>
    </div>

    <div v-else>
      <h1 class="library-header">
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

      <h2 v-show="loadedAlbums.length == 0">You haven't got any saved albums!</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import ToggleGroup from "./ToggleGroup.vue";
import Year from "./Year.vue";

export default {
  components: {
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
      loadedAlbums: 0
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

  async mounted() {
    const load_albums = async function(request_url, albums) {
      await axios.get(request_url)
                 .then(
                   async function(data) {
                     this.loadedAlbums += data.data.items.length

                     //Y'all ever heard of recursion?
                     if (data.data.next) {
                       await load_albums(data.data.next + "&access_token=" + this.access_token, albums)
                     }

                     data = data.data.items

                     for (var album of data) {
                       const releaseYear = album["album"]["release_date"].split("-")[0]
                       albums[releaseYear] ? null : albums[releaseYear] = { year: releaseYear, albums: [] }
                       albums[releaseYear]["albums"].push(album)
                     }
                   }.bind(this)
                  )
        return albums
    }.bind(this)

    this.albumsByYear = await load_albums(this.albums_request_url, {})

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

.library-header { margin: $spacer 0 $spacer*4 0; }

.loading {
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading-title { margin-bottom: $spacer*2; }
  
  .loading-title:after {
    position: absolute;
    color: $pink;
    animation: ellipsis steps(4,end) 2000ms infinite;
    content:"";
  }
  @keyframes ellipsis {
    0% { content: "" }
    25% { content: "." }
    50% { content: ".." }
    75% { content: "..." }
  }

  .album-count { color: $grey-ll; }
}
</style>
