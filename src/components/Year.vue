<template>
  <li class="year">
    <div class="year-header">{{ year }} ({{ albums.length }})</div>
    <ol class="albums-list">
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
