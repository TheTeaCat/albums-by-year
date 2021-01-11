<template>
  <div :class="{ app:true, desktop: desktop }">
    <div class="header">
      Albums By Year
      <div class="theme-controls" @click="changeTheme">
        Theme: 
        <font-awesome-icon class="theme-icon" 
                          :icon="theme.icon"
                          :title="theme.label"/>
      </div>
    </div>

    <main>
      <div class="login" v-if="!authorised">
        <h1 class="title">Albums By Year</h1>
        <p class="preface">See your saved albums on spotify, categorised by year!</p>
        <a class="auth" :href="authoriseURL" target="_self">LOG IN WITH SPOTIFY</a>
      </div>
      <Library v-else :access_token="access_token" ref="library" @loaded="refreshing=false"/>
    </main>

    <footer>
      <ul class="footer-buttons" v-if="authorised">
        <li class="logout-button" @click="logout">
          <font-awesome-icon class="icon"
                            icon="sign-out-alt"
                            title="Log Out"/>
          Log Out
        </li>
        <li class="refresh-button" @click="refresh">
          <font-awesome-icon :class="{ 'icon':true, 'refreshing-icon':refreshing }"
                            icon="sync-alt"
                            title="Refresh"/>
          Refresh
        </li>
      </ul>
      <ul>
        <li>
          <font-awesome-icon :icon="['fab', 'github']" class="icon"
          /><a href="https://github.com/TheTeaCat/albums-by-year/"
          >GitHub</a>
        </li>
        <li>Made by <a href="http://joshuarainbow.co.uk/">Josh</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import axios from "axios"
import Library from "./components/Library.vue";

export default {
  components: {
    Library
  },
  
  data() { return {
    scopes: ['user-library-read'],
    client_id: "8c00d93547824017b1854018ed35bdef",
    access_token: null,
    theme:{icon:"moon",name:"dark",label:"Dark Theme"},
    refreshing:false,
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

  methods: {
    async logout() {
      this.access_token = null
      this.$cookies.remove("access_token")
      await caches.delete('albums-by-year-data-cache')       
    },
    refresh() {
      //Can't refresh if there's no library
      if (!this.$refs['library']) { return }
      //Can't refresh if already refreshing
      if (this.refreshing) { return }

      this.refreshing = true
      this.$refs['library'].refresh()
    },
    changeTheme(theme_name) {
      const themes = {
        "system": {icon:"fill-drip",label:"System Theme"},
        "dark": {icon:"moon",label:"Dark Theme"},
        "pink": {icon:"ice-cream",label:"Pink Theme"}
      }
      if (Object.keys(themes).indexOf(theme_name) > 0) {
        this.theme.name = theme_name
      } else {
        const theme_names = Object.keys(themes)
        this.theme.name = theme_names[(theme_names.indexOf(this.theme.name)+1)%theme_names.length]
      }
      this.theme.icon = themes[this.theme.name].icon
      this.theme.label = themes[this.theme.name].label
      document.getElementsByTagName("html")[0].setAttribute("theme", this.theme.name)
      this.$cookies.set('theme',this.theme.name)
    }
  },

  async mounted() {
    //Get access token from cookies...
    if (this.$cookies.isKey("access_token")) {
      this.access_token = this.$cookies.get("access_token")
      //Check access token is still valid...
      await axios.get(
        "https://api.spotify.com/v1/me/?access_token=" + this.access_token
        ).catch(
          async function() { 
            //If the access token is invalid, we clear the cache and the access_token.
            this.access_token = null
            this.$cookies.remove("access_token")
            await caches.delete('albums-by-year-data-cache') 
          }.bind(this)
        )
    }

    //Get access token from hash fragments if one exists...
    var hash_fragments = {}
    this.$route.hash.split('&')
      .map(part => part.replace('#', ''))
      .forEach(param => {
        const parts = param.split('=');
        hash_fragments[parts[0]] = parts[1];
      });
    this.access_token = hash_fragments["access_token"] 
                        ? hash_fragments["access_token"] 
                        : this.access_token
    //... &clear the URL bar
    if (hash_fragments["access_token"]) {
      this.$router.push(this.$route.path)
    }

    /* Set access token in cookie. 
       This is low risk security-wise as it's only a read-only token.
    */
    if (this.authorised) {
      this.$cookies.set("access_token", this.access_token)
    }

    //Get the theme from the user's cookie
    if (this.$cookies.isKey('theme')) {
      this.changeTheme(this.$cookies.get('theme'))
    } else {
      this.changeTheme("dark")
    }
  },
}
</script>

<style lang="scss">
.app {
  min-height:100%;

  background:var(--background);

  margin: 0 auto;
  padding: $spacer*2 $spacer*4;

  display:flex;
  flex-direction: column;

  &.desktop { max-width:140vh; }
}

.header {
  color:var(--text-colour-subtle);
  padding-top: $spacer;
  .theme-controls { float:right; }
}

main {
  flex-grow:1;
  display:flex;
  .login {
    margin: 0 auto;
    align-self: center;
    display:flex;
    flex-direction:column;
    align-items: center;
    .title {
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid var(--background-alt-1);
      padding: $spacer*3 0;
      width:100%;
    }
    .preface {
      margin: $spacer*3 0;
      font-size: 125%;
      text-align: center;
    }
    .auth {
      background: $pink-d;
      padding: $spacer*2 $spacer*4;
      border-radius: $spacer*4;
      letter-spacing: 2px;
      text-align: center;
      font-weight:700;
      text-shadow: 0px 0px 5px rgba(0,0,0,0.7);
      color: $white;
      &:hover {
        background: $pink;
      }
    }
  }
}

footer {
  padding-top: $spacer*3;
  padding-bottom: $spacer;

  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .icon { margin: 0 0.25em; }

  a {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  ul {
    margin-top: $spacer*2;

    li { 
      display:inline; 
      width:fit-content; 
      &::after {
        content:"|";
        margin: 0 0.5em;
        color: var(--text-colour-subtle);
      }
      &:last-child::after { content:""; }

      @keyframes spin {
        0% { transform: rotateZ(0deg) }
        25% { transform: rotateZ(90deg) }
        50% { transform: rotateZ(180deg) }
        75% { transform: rotateZ(270deg) }
        100% { transform: rotateZ(360deg) }
      }
      .refreshing-icon {
        animation: spin linear 1000ms infinite;
      }
    }
  }
}
</style>
