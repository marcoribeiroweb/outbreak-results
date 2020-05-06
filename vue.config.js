module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_app.scss";`,
      },
    },
  },
};
