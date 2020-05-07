<template>
  <li class="album">
    <img v-if="albumCover" :src="albumCover">
    <div class="album-title">{{ album.album.name }}</div>
    <ul class="album-artists-list">
        <li v-for="artist in album.album.artists" :key="artist.id" >
            {{ artist.name }}
        </li>
    </ul>
    <div class="album-release-date">{{ album.album.release_date }}</div>
  </li>
</template>

<script>

export default {
  props: ["access_token","album"],

  data() { return {
      albumCover: null
  }},

  mounted() {
      this.album.album.images.sort((a,b)=>{return b.width*b.height - a.width*a.height})[0]
      this.albumCover = this.album.album.images[0].url
  }
}
</script>

<style lang="scss" scoped>
</style>
