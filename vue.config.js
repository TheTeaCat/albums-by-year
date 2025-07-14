module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        additionalData: `
        @use "sass:meta";
        @use "~@/assets/css/_vars" as *;
        `,
        implementation: require("sass"),
        sassOptions: {
          // Use modern API
          api: "modern-compiler",
        },
      },
    },
  },
  pwa: {
    name: "Albums By Year",
    themeColor: "#FF69B4",
    msTileColor: "#121212",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
  },
};
