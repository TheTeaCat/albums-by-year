<template>
  <div class="library">
    <div class="loading" v-if="!loaded">
      <h1 class="loading-title">Loading</h1>
      <p class="album-count">{{ loadedAlbums }} albums</p>
    </div>

    <div v-else>
      <h1 class="library-header">
        <a :href="profile.external_urls.spotify" class="username"
          >{{ profile.display_name }}</a>{{ profile.display_name[profile.display_name.length-1] == 's' ? '\'' : '\'s' }}
          saved albums, by year<span>!</span>
      </h1>

      <ToggleGroup :options="album_types" :title="'Release Types'"/>

      <div class="searchbox-cont">
        <input placeholder="Search..."
              :class="{ searchbox:true, populated:searchBoxContent!='' }"
              v-model="searchBoxContent"
              @keyup.enter="updateSearchQuery"
              @keyup="searchQueryChange"/>
        <font-awesome-icon v-if="(searchBoxContent!=search_query)||searchBoxContent==''" icon="search" class="icon fa-fw" @click="updateSearchQuery"/>
        <font-awesome-icon v-else icon="times" class="icon fa-fw" @click="clearSearchQuery"/>
      </div>

      <ol>
        <Year v-for="year in sortedAlbumYears" :key="year"
        :year="year"
        :albums="albumsByYear[year].albums"
        :album_types="album_types"
        :search_query="search_query"
        :access_token="access_token" 
        @filtered="event => { albumsByYear[year].empty = event == 0; checkAlbumsShown() }"/>
      </ol>

      <h2 v-show="loadedAlbums.length == 0" class="empty-notice">You haven't got any saved albums!</h2>
      <h2 v-show="no_albums_shown" class="empty-notice">None of your albums match these filters!</h2>
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
      loadedAlbums: 0,
      search_query: "",
      searchBoxContent:"",
      no_albums_shown: false
  }},
  
  computed: {
    albums_request_url() {
      return "https://api.spotify.com/v1/me/albums?" +
      "&limit=50" +
      "&offset=0"
    },
    profile_request_url() {
      return "https://api.spotify.com/v1/me/?"
    },
    sortedAlbumYears() {
      return Object.keys(this.albumsByYear).sort((a,b)=>{return b-a})
    },
    loaded() {
      return this.albumsByYear && this.profile
    },
  },

  methods: {
    async loadProfile() {
      const cache = await caches.open('albums-by-year-data-cache');

      var response = await cache.match(this.profile_request_url)

      //If no matching value in cache, then fetch the value & add it to the cache...
      if (response == undefined) {
        response = await axios.get(this.profile_request_url + "&access_token=" + this.access_token)
        await cache.put(this.profile_request_url, new Response(JSON.stringify(response)))
        response = await cache.match(this.profile_request_url)
      }

      //Get json from response:
      var data = await response.json()

      this.profile = data.data
    },
    async loadAlbums() {
      const cache = await caches.open('albums-by-year-data-cache');

      const load_albums_chunk = async function(request_url, albums) {  
        //Check cache
        var response = await cache.match(request_url, { ignoreVary: true })

        //If no matching value in cache, then fetch the value & add it to the cache...
        if (response == undefined) {
          response = await axios.get(request_url + "&access_token=" + this.access_token)
          await cache.put(request_url, new Response(JSON.stringify(response)))
          response = await cache.match(request_url)
        }

        //Get json from response:
        var data = await response.json()
        data = data.data

        //Increment number of albums loaded...
        this.loadedAlbums += data.items.length

        //Y'all ever heard of recursion?
        if (data.next) {
          await load_albums_chunk(data.next, albums)
        }

        //Add data.items to albums...
        for (var album of data.items) {
          if (album != undefined) {
            const releaseYear = album["album"]["release_date"].split("-")[0]
            albums[releaseYear] ? null : albums[releaseYear] = { year: releaseYear, albums: [] }
            albums[releaseYear]["albums"].push(album)
          }
        }

        this.$emit("loaded")
        return albums
      }.bind(this)

      this.albumsByYear = await load_albums_chunk(this.albums_request_url, {})
    },
    async refresh() {
      this.loadedAlbums = 0
      this.albumsByYear = null
      this.profile = null
      await caches.delete('albums-by-year-data-cache')
      this.loadProfile()
      this.loadAlbums()
    },
    updateSearchQuery() {
      this.search_query = this.searchBoxContent.trim()
    },
    searchQueryChange(event) {
      var value = event.target.value
      setTimeout(() => {value == this.searchBoxContent ? this.updateSearchQuery(event) : null}, 1000)
    },
    clearSearchQuery() {
      this.searchBoxContent = ""
      this.search_query = ""
    },
    checkAlbumsShown() {
      this.no_albums_shown = Object.keys(this.albumsByYear).map(year => this.albumsByYear[year].empty).every(x=>x)
    }
  },

  async mounted() {
    this.loadProfile()
    this.loadAlbums()
  },
}
</script>

<style lang="scss" scoped>
.library { width:100%; }

.library-header { 
  margin: $spacer 0 $spacer*3 0; 
  .username {
    word-wrap: break-word;
  }
}

.searchbox-cont {
  width:100%;
  display:flex;
  align-items: center;
  .searchbox {
    width:150px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size:120%;
    padding: $spacer;
    border:none;
    border-bottom: 3px solid var(--background-alt-1);
    color: var(--text-colour);
    background: var(--background);
    transition: background 0.2s ease, flex-basis 0.2s ease;
    flex-basis:0;
    &:focus {
      background: var(--background-alt-2);      
      flex-basis:100%;
    }
    &.populated {
      flex-basis:100%;
    }
    &::placeholder {
      color: var(--text-colour-subtle);
      font-weight: 400;
    }
    @media(max-width:768px) {
      flex-grow:1;
    }
  }
  .icon {
    height:25px;
    width:25px;
    color: var(--background-alt-1);
    padding: $spacer;
  }
}

.empty-notice {
  margin: $spacer*2 0;
}

.loading {
  height:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading-title { margin-bottom: $spacer*2; }
  
  .loading-title:after {
    position: absolute;
    color: var(--text-colour-alt);
    animation: ellipsis steps(4,end) 2000ms infinite;
    content:"";
  }
  @keyframes ellipsis {
    0% { content: "" }
    25% { content: "." }
    50% { content: ".." }
    75% { content: "..." }
  }

  .album-count { color: var(--text-colour-subtle); }
}
</style>
