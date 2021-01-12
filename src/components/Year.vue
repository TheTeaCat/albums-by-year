<template>
  <li class="year" v-show="visibleAlbums > 0">
    <h2 class="year-header" @click="expanded = !expanded">
      <font-awesome-icon 
        :icon="expanded ? 'minus' : 'plus'" 
        :class="{ icon: true, expanded: expanded }"
      /> {{ year }} <span>({{ visibleAlbums }})</span>
    </h2>

    <ol v-show="expanded" class="albums-list">
      <Album v-for="a in sortedAlbums" :key="a.album.id"
             :album="a" v-show="albumShown(a)"/>
    </ol>
  </li>
</template>

<script>
import Album from "./Album.vue";

export default {
  components: {
      Album
  },

  props: ["year","albums","album_types","search_query"],

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
      var albums_visible = this.albums.filter(a => this.albumShown(a)).length
      this.$emit("filtered",albums_visible)
      return albums_visible
    },
  },

  methods: {
    albumShown(a) {
      return this.album_types[a.album.album_type].show 
              && ( this.search_query == "" 
                   || a.album.name.toLowerCase().includes(this.search_query.toLowerCase())
                   || a.album.artists.map(artist => artist.name.toLowerCase().includes(this.search_query.toLowerCase())).some(x => x))
    }
  }
}
</script>

<style lang="scss" scoped>
.year {
  margin-top: $spacer*2;
  padding-top: $spacer*2;
  border-top: 2px solid var(--background-alt-3);
}

.icon.expanded { color: var(--text-colour-alt); }

span {
  font-size:75%;
  color: var(--text-colour-subtle);
}

ol {
  margin: $spacer;

  display: flex;
  flex-wrap:wrap;
}
</style>
