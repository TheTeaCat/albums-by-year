<template>
  <li class="year" v-show="visibleAlbums > 0">
    <hr>
    <h2 class="year-header">    
      <font-awesome-icon 
        :icon="expanded ? 'minus' : 'plus'" 
        :class="{ icon: true, expanded: expanded }"
        @click="expanded = !expanded"
      /> {{ year }} <span>({{ visibleAlbums }})</span>
    </h2>

    <ol v-show="expanded" class="albums-list">
      <Album v-for="album in sortedAlbums" :key="album.album.id"
      :album="album" v-show="album_types[album.album.album_type].show"/>
    </ol>
  </li>
</template>

<script>
import Album from "./Album.vue";

export default {
  components: {
      Album
  },

  props: ["access_token","year","albums","album_types"],

  data() { return {
    expanded: false
  }},

  computed: {
    sortedAlbums() {
      return this.albums.slice()
        .sort((a,b) => {
          var aa = a.album.release_date,
              bb = b.album.release_date;
          return aa > bb ? -1 : (aa < bb ? 1 : 0)
      })
    },
    visibleAlbums() {
      return this.albums.filter(album => this.album_types[album.album.album_type].show).length
    }
  }
}
</script>

<style lang="scss" scoped>
.year, hr { margin: $spacer*2 0; }

hr { border-color: $grey-l; }

.icon.expanded {
  color: $green;
}
span {
  font-size:75%;
  color: $grey-ll;
}

ol {
  margin: $spacer;

  display: flex;
  flex-wrap:wrap;
}
</style>
