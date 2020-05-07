<template>
  <div id="app">
    <div v-if="!authorised"> 
      <!-- Should be a nice landing page with "click here to authenticate" button or similar here -->
      <a :href="authoriseURL">Authenticate</a>
    </div>
    <div v-else>
      <Library :access_token="access_token" />
    </div>
  </div>
</template>

<script>
import Library from "./components/Library.vue";

export default {
  components: {
    Library
  },
  
  data() { return {
    scopes: ['user-library-read', 'user-modify-playback-state'],
    client_id: "8c00d93547824017b1854018ed35bdef",
    access_token: null,
  }},

  computed: {
    authorised() {
      return this.access_token ? true : false
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
    //Get access token from hash fragments...
    var hash_fragments = {}
    this.$route.hash.split('&')
      .map(part => part.replace('#', ''))
      .forEach(param => {
        const parts = param.split('=');
        hash_fragments[parts[0]] = parts[1];
      });
    this.access_token = hash_fragments["access_token"]

    //... &clear the URL bar
    if (this.authorised) {
      this.$router.push(this.$route.path)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
