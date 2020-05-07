<template>
  <div id="app">
    <a v-if="!authorised" :href="authoriseURL">Authenticate</a>
    <p>{{ access_token }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() { return {
    scopes: ['user-library-read', 'user-modify-playback-state'],
    client_id: "8c00d93547824017b1854018ed35bdef",
    access_token: this.$route.hash.split('&')
                  .map(part => part.replace(/#/, ''))
                  .map(part => part.split("="))
                  .filter(part => part[0] == "access_token")[0][1],
  }},
  computed: {
    authorised() {
      return this.$route.query.access_token ? true : false
    },
    authoriseURL() {
      return "https://accounts.spotify.com/authorize?" +
      "client_id=" + this.client_id +
      "&response_type=token" + 
      "&redirect_uri=" + location.protocol + '//' + location.host + "/" +
      "&scope=" + this.scopes.join("%20")
    }
  },
  mounted() {
    console.log(this.$route.query)

    if (this.authorised) {
      //clear the URL bar
      this.$router.push(this.$route.path)
    }
  },
}
</script>

<style>
</style>
