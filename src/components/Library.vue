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
        <input ref="searchBox" placeholder="Filter by keyword..."
              :class="{ searchbox:true, populated:searchBoxContent!='' }"
              v-model="searchBoxContent"
              @keyup.enter="updateSearchQuery"
              @keyup="searchQueryChange"/>
        <font-awesome-icon v-if="searchBoxContent==''" icon="search" class="icon fa-fw" @click="updateSearchQuery"/>
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
    },
  },

  methods: {
    updateSearchQuery() {
      this.search_query = this.$refs['searchBox'].value.trim()
    },
    searchQueryChange(event) {
      var value = event.target.value
      setTimeout(() => {value == this.$refs['searchBox'].value ? this.updateSearchQuery(event) : null}, 1000)
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

.library-header { margin: $spacer 0 $spacer*3 0; }

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
    border-bottom: 3px solid $pink;
    background: $black;
    color: $white;
    transition: background 0.2s ease;
    &:focus {
      flex-grow:1;
      background: $grey;      
    }
    &.populated {
      flex-grow:1;
    }
    &::placeholder {
      color: $grey-ll;
    }
    @media(max-width:768px) {
      flex-grow:1;      
    }
  }
  .icon {
    height:25px;
    width:25px;
    color: $pink;
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
