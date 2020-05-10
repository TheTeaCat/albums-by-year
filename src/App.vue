<template>
  <div :class="{ app:true, desktop: desktop }">
    <div class="title">Spotify Albums By Year</div>

    <main v-if="!authorised"> 
      <!-- Should be a nice landing page with "click here to authenticate" button or similar here -->
      <h1 class="auth"><a :href="authoriseURL" target="_self">Click here</a> to log in with Spotify<span>!</span></h1>
    </main>
    <main v-else>
      <Library :access_token="access_token" />
    </main>

    <footer>
      <ul>
        <li>
          <font-awesome-icon icon="code-branch" class="icon"
          /><a href="https://github.com/TheTeaCat/spotify-albums-by-year/"
          >GitHub</a>
        </li>
        <li>Made by <a href="http://joshuarainbow.co.uk/">Josh</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Library from "./components/Library.vue";

export default {
  components: {
    Library
  },
  
  data() { return {
    scopes: ['user-library-read'],
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
      "&redirect_uri=" + location.protocol + '//' + location.host + location.pathname +
      "&scope=" + this.scopes.join("%20")
    },
    desktop() {
      return !/Mobi/i.test(window.navigator.userAgent);
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

<style lang="scss">
.app {
  padding: $spacer*2 $spacer*4;
  box-sizing:border-box;
  min-height:100%;
  margin: 0 auto;
  background:$black;
  display:flex;
  flex-direction: column;

  &.desktop {
    max-width:140vh;
  }
}

.title {
  color:$grey-ll;
  margin-bottom: $spacer;
}

main {
  flex-grow:1;
  display:flex;
}

.auth {
  align-self: center;
  width:100%;
  text-align: center;
}

footer {
  padding-top: $spacer*3;
  padding-bottom: $spacer;

  .icon {
    margin-right: 0.25em;
  }

  a {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  li {
    display:inline-block;
  }
  li::after {
    content:"|";
    margin: 0 0.5em;
    color: $grey-l;
  }
  li:last-child::after { content:""; }
}
</style>
