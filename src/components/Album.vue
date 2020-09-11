<template>
  <li class="album">
    <img v-if="albumCover" :src="albumCover">

    <div class="album-title"><a :href="album.album.external_urls.spotify">{{ album.album.name }}</a></div>

    <ul class="artists-list">
        <li v-for="artist in album.album.artists" :key="artist.id" 
        ><a :href="artist.external_urls.spotify">{{ artist.name }}</a></li>
    </ul>

    <div class="album-release-date">{{ album.album.release_date.replace(/-/g,"/") }}</div>
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
.album {
  padding: $spacer;
  
  flex-basis:33.3%;
  @media(min-width: 750px) { flex-basis:16.6%; }

  > * { margin-bottom: $spacer; }
  * { overflow-wrap:anywhere; }

  a { text-decoration: none; }

  img { width:100%; }

  .album-title {
    font-weight:700;
    font-size:110%;
  }

  .artists-list {
    a { color: var(--text-colour-subtle); }
    a:hover { color: var(--text-colour-alt); }

    li { display:inline-block; }
    li::after {
      content:", ";
      white-space: pre;
    }
    li:last-child::after { content:""; }
  }
}
</style>
