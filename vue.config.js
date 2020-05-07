module.exports = {
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