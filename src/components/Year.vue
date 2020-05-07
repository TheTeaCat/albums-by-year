<template>
  <li class="year">
    <div class="year-header">{{ year }} ({{ albums.length }})</div>
    <ol class="albums-list">
      <Album v-for="album in albums" :key="album.album.id"
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
}
</script>

<style lang="scss" scoped>
</style>
