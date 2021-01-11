<template>
  <div :class="{ app:true, desktop: desktop }">
    <div class="header">
      Albums By Year
      <div class="theme-controls">
        Theme: 
        <font-awesome-icon class="theme-icon" 
                          :icon="theme.icon"
                          @click="changeTheme"
                          :title="theme.label"/>
      </div>
    </div>

    <main>
      <div class="login" v-if="!authorised">
        <h1 class="title">Albums By Year</h1>
        <p class="preface">See your saved albums on spotify, categorised by year!</p>
        <a class="auth" :href="authoriseURL" target="_self">LOG IN WITH SPOTIFY</a>
      </div>
      <Library v-else :access_token="access_token" />
    </main>

    <footer>
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
import Library from "./components/Library.vue";

export default {
  components: {
    Library
  },
  
  data() { return {
    scopes: ['user-library-read'],
    client_id: "8c00d93547824017b1854018ed35bdef",
    access_token: null,
    theme:{icon:"moon",name:"dark",label:"Dark Theme"}
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

  .icon { margin-right: 0.25em; }

  a {
    text-decoration: underline;
    text-decoration-style: dashed;
  }

  li { display:inline-block; }
  li::after {
    content:"|";
    margin: 0 0.5em;
    color: var(--text-colour-subtle);
  }
  li:last-child::after { content:""; }
}
</style>
