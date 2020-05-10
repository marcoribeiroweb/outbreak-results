<template>
  <div class="container-row">
    <div v-for="(data, index) in globalData" :key="index" class="card" :class="data.class">
      <h3 class="type">{{ data.name }}</h3>
      <p class="value">{{ data.value | numberWithCommas }}</p>
      <span class="secondary-info" v-if="data.secondaryValue">
        <span class="secondary-info__value">{{ data.secondaryValue | numberWithCommas}}</span>
        <span class="secondary-info__text">{{data.secondaryText}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    dataYesterday: {
      type: Number
    }
  },
  computed: {
    globalData() {
      return [
        {
          value: this.data.cases,
          name: "Total Cases",
          class: "total-cases",
          secondaryValue:
            this.data.todayCases > 0
              ? `+${this.data.todayCases}`
              : `-${this.data.todayCases}`,
          secondaryText: "from yesterday"
        },
        {
          value: this.data.deaths,
          name: "Total Deaths",
          class: "total-deaths",
          secondaryValue:
            this.data.todayDeaths > 0
              ? `+${this.data.todayDeaths}`
              : `-${this.data.todayDeaths}`,
          secondaryText: "from yesterday"
        },
        {
          value: this.data.recovered,
          name: "Total Recovered",
          class: "total-recovered",
          secondaryValue:
            this.data.recovered - this.dataYesterday > 0
              ? `+${this.data.recovered - this.dataYesterday}`
              : `-${this.data.recovered - this.dataYesterday}`,
          secondaryText: "from yesterday"
        },
        {
          value: this.data.active,
          name: "Active Cases",
          class: "active-cases",
          secondaryValue: this.data.critical,
          secondaryText: "are critical"
        }
      ];
    }
  },
  filters: {
    numberWithCommas(value) {
      return typeof value != "undefined"
        ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "";
    }
  }
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
  @include padding(20px);
  border-radius: 4px;
  background-color: #8870ff;
  box-shadow: 0px 4px 16px rgba(17, 17, 26, 0.1);

  &.total-cases {
    background-color: #8870ff;
    .secondary-info {
      &__value {
        background-color: #fff;
        color: #8870ff;
      }
    }
  }

  &.active-cases {
    background-color: #fcb941;

    .secondary-info {
      &__value {
        background-color: #fff;
        color: #fcb941;
      }
    }
  }

  &.total-deaths {
    background-color: #f1654c;

    .secondary-info {
      &__value {
        background-color: #fff;
        color: #f1654c;
      }
    }
  }

  &.total-recovered {
    background-color: #2cc990;

    .secondary-info {
      &__value {
        background-color: #fff;
        color: #2cc990;
      }
    }
  }

  .secondary-info {
    display: flex;
    align-items: center;
    @include margin-top(15px);

    &__value {
      display: block;
      @include f-medium;
      @include font-size(14px);
      background-color: #fff;
      border-radius: 4px;
      padding: 5px;
      color: #fff;
    }

    &__text {
      display: block;
      @include f-regular;
      @include font-size(14px);
      color: #fff;
      margin-left: 8px;
    }
  }

  .value {
    @include f-medium;
    @include font-size(34px);
    color: #fff;
  }

  .type {
    @include f-medium;
    @include font-size(14px);
    @include margin-bottom(8px);
    color: #fff;
  }
}
</style>
