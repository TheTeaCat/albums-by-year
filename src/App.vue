<template>
  <div id="app">
    <a v-if="!authorised" :href="authorizeURL">Authenticate</a>
    <p v-else>{{ token }}</p>
  </div>
</template>

<script>
var SpotifyWebApi = require('spotify-web-api-node');

export default {
  name: 'App',
  components: {
  },
  mounted() {
    console.log(this.$route)
  },
  computed: {
    authorised() {
      return true
    },
    token() {
      return this.$route.query.code
    },
    authorizeURL() {
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
