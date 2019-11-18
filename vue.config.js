// vue.config.js
module.exports = {
    publicPath: "./",
    css: {
      loaderOptions: {
        sass: {
          data: `@import "@/assets/scss/main.scss";`
        }
      }
    },
    transpileDependencies: ['vuex-persist']
  }