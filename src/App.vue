<template>
  <div id="app">
    <a v-if="!authorised" :href="authoriseURL">Authenticate</a>
    <p v-else>{{ token }}</p>
  </div>
</template>

<script>
var SpotifyWebApi = require('spotify-web-api-node');

export default {
  name: 'App',
  components: {
  },
  data() { return {
    authorised: false,
    token: null
  }},
  mounted() {
    this.authorised = this.$route.query.code ? true : false
    if (this.authorised) {
      this.token = this.$route.query.code
      this.$router.push(this.$route.path)
    }
  },
  computed: {
    authoriseURL() {
      var scopes = ['user-library-read', 'user-modify-playback-state']
      var redirectUri = location.href
      var clientId = '8c00d93547824017b1854018ed35bdef'

      console.log(redirectUri)

      var spotifyApi = new SpotifyWebApi({
        redirectUri: redirectUri,
        clientId: clientId
      });

      return spotifyApi.createAuthorizeURL(scopes);
    }
  }
}
</script>

<style>
</style>
