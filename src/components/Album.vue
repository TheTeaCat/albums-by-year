<template>
  <li class="album">
    <img v-if="lazyCoverString && !albumCoverLoaded" 
         :src="'data:image/jpeg;base64,'+lazyCoverString">
    <img v-if="online || albumCoverLoaded"
         v-show="albumCoverLoaded" 
         @load="albumCoverLoaded=true"
         :src="albumCover">

    <div class="album-title"><a :href="album.album.external_urls.spotify">{{ album.album.name }}</a></div>

    <ul class="artists-list">
        <li v-for="artist in album.album.artists" :key="artist.id" 
        ><a :href="artist.external_urls.spotify">{{ artist.name }}</a></li>
    </ul>

    <div class="album-release-date">{{ release_date }}</div>
  </li>
</template>

<script>
import axios from "axios"

export default {
  props: ["album"],

  data() { return {
      albumCover: null,
      lazyCoverString: "",
      albumCoverLoaded: false,
      online:false,
  }},

  computed: {
    release_date() {
      switch (this.album.album.release_date_precision) {
        case 'year':
          return this.album.album.release_date.split("-")[0]
        case 'month':
          return this.album.album.release_date.split("-").slice(0,2).join("/")
        case 'day':
          return this.album.album.release_date.replace(/-/g,"/")
        default:
          return ""
      }
    },
  },

  async mounted() {
    //Set if online
    this.online = navigator.onLine
    
    //Add event listeners for online status
    window.addEventListener("online",function(){this.online=true}.bind(this))
    window.addEventListener("offline",function(){this.online=false}.bind(this))

    //Find the lowest resolution image
    await this.album.album.images.sort((a,b) => { return a.width*a.height - b.width*b.height})
    var albumCoverLowRes = this.album.album.images[0].url

    //Check the cache for the low resolution image...
    const cache = await caches.open('albums-by-year-image-cache');
    var response = await cache.match(albumCoverLowRes)

    //...If it's not there, load and cache it as a base64 string...
    if (response == undefined) {
      console.log("Image not cached :(")
      response = await axios.get(albumCoverLowRes, { responseType: 'arraybuffer' })
      const lazyCover = Buffer.from(response.data, 'binary').toString('base64')
      await cache.put(albumCoverLowRes, new Response(JSON.stringify(lazyCover)))
      response = await cache.match(albumCoverLowRes)
    }

    //...then load it out of the response.
    this.lazyCoverString = await response.json()
    
    //Pick the image with the closest resolution to 300x300.
    await this.album.album.images.sort(
      (a,b) => {
        return Math.abs(a.width*a.height - 300*300)
                - Math.abs(b.width*b.height - 300*300)
        }
      )
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
