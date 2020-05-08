<template>
  <div id="app">
    <Navbar />
    <Dashboard />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Dashboard,
  },
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
}

.container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @include padding(0 50px);
}
</style>
