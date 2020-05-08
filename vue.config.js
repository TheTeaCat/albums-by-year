module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/spotify-albums-by-year/'	
  : '/',
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        prependData: `
        @import '~@/assets/css/reset.css';
        @import "~@/assets/css/_vars";
        @import "~@/assets/css/styles.scss";        
        `
      }
    }
  },
};