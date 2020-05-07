<template>
  <div id="library">
      {{ albums }}
  </div>
</template>

<script>
import axios from "axios"

export default {
  components: {
  },
  props: ["access_token"],
  data() { return {
      albums: null
  }},

  mounted() {
    axios.get(this.request_url)
         .then(
           function(data) {
             this.albums = data["data"]["items"]
           }.bind(this)
          )
  },
  computed: {
    request_url() {
      return "https://api.spotify.com/v1/me/albums?" +
      "access_token=" + this.access_token +
      "&limit=50" +
      "&offset=0"
    }
  },
}
</script>

<style>
</style>
