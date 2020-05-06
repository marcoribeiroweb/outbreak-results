<template>
  <nav class="navbar">
    <div class="container">
      <img class="logo-svg" src="@/assets/images/logo-covid19.svg" alt="" />
      <h1 class="logo">Covid-19 Tracker</h1>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  @include padding(50px 0);

  .container {
    display: flex;
    align-items: center;
  }

  .logo-svg {
    width: 45px;
  }

  .logo {
    @include f-medium;
    @include font-size(22px);
    margin-left: 15px;
  }
}
</style>
