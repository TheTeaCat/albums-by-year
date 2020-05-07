<template>
  <li class="year">
    <hr>
    <h2 class="year-header">    
      <font-awesome-icon 
        :icon="expanded ? 'minus' : 'plus'" 
        @click="expanded = !expanded"
      /> {{ year }} ({{ albums.length }})
    </h2>

    <ol v-show="expanded" class="albums-list">
      <Album v-for="album in sortedAlbums" :key="album.album.id"
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

  props: ["access_token","year","albums"],

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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
