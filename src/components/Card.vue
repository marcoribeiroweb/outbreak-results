<template>
  <div class="container-row">
    <div v-for="(name, value, index) in data" :key="index" class="card" :class="name">
      <p class="value">{{ name | numberWithCommas }}</p>
      <h3 class="type">{{ value }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  filters: {
    numberWithCommas(value) {
      return typeof value != "undefined" ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container-row {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto;
  gap: 1em 1em;

  @media only screen and (max-width: 850px) {
    grid-template-columns: auto auto;
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: auto;
  }
}

.card {
  display: block;
  @include padding(25px 30px);
  border-radius: 4px;
  background-color: #8870ff;
  box-shadow: 0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1);

  &.casos-diarios {
    background-color: #fcb941;
  }

  &.morte-diaria {
    background-color: #f1654c;
  }

  &.recuperados {
    background-color: #2cc990;
  }

  &.total {
    background-color: #8870ff;
  }

  .value {
    @include f-medium;
    @include font-size(38px);
    color: #fff;
  }

  .type {
    @include f-regular;
    @include font-size(16px);
    @include margin-top(10px);
    color: #fff;
  }
}
</style>
