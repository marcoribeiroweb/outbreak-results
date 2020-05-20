<template>
  <div id="app">
    <Navbar />
    <Dashboard />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Dashboard from "./components/Dashboard.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Dashboard,
    Footer
  }
};
</script>

<style lang="scss">
@import "~normalize.css";
@import "~reset-css";

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  width: 100%;
}

.container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @include padding(0 50px);
}
</style>
