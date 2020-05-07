<template>
  <li class="year">
    <hr>
    <h2 class="year-header">    
      <font-awesome-icon 
        :icon="expanded ? 'minus' : 'plus'" 
        :class="{ icon: true, expanded: expanded }"
        @click="expanded = !expanded"
      /> {{ year }} <span>({{ sortedFilteredAlbums.length }})</span>
    </h2>

    <ol v-show="expanded" class="albums-list">
      <Album v-for="album in sortedFilteredAlbums" :key="album.album.id"
      :album="album"/>
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
    sortedFilteredAlbums() {
      return this.albums.slice()
        .sort((a,b) => {
          var aa = a.album.release_date,
              bb = b.album.release_date;
          return aa > bb ? -1 : (aa < bb ? 1 : 0)
      }).filter(album => this.album_types[album.album.album_type].show)
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
