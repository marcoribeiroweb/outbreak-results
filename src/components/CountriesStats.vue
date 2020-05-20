<template>
  <div class="countries-stats">
    <h2 class="title">Stats per country</h2>
    <div class="search-wrapper">
      <input type="text" v-model="searchedCountry" placeholder="Search for your country..." />
      <svg class="search-icon" viewBox="0 0 21 21">
        <path
          d="M20.2 18.7c.4.4.4 1.1 0 1.5-.4.4-1.1.4-1.5 0L13.6 15c-.2-.2-.6-.2-.8-.1 0 0-.1.1-.4.3-1.2.7-2.5 1-3.9 1-4.4 0-7.9-3.5-7.9-7.9S4 .5 8.4.5s7.9 3.5 7.9 7.9c0 1.4-.4 2.8-1 3.9-.2.3-.3.4-.3.4-.2.2-.1.6.1.8l5.1 5.2zM8.4 14.2c3.2 0 5.8-2.6 5.8-5.8s-2.6-5.8-5.8-5.8-5.8 2.6-5.8 5.8 2.6 5.8 5.8 5.8z"
        />
      </svg>
      <button v-show="searchedCountry" class="clear-input" @click="cleanSearchCountry">clear</button>
    </div>
    <div class="scroll-container" sticky-container>
      <div class="scroll-inner">
        <div class="countries-stats__bar">
          <ul v-sticky>
            <li>#</li>
            <li>Country</li>
            <li>Total Cases</li>
            <li>Total Deaths</li>
            <li>Total Recovered</li>
            <li>Active Cases</li>
          </ul>
        </div>

        <ul class="countries-stats__list">
          <li
            class="countries-stats__list-item"
            v-for="(country, index) in filteredCountries"
            :key="index"
          >
            <div class="list-number">{{ index + 1 }}</div>
            <div class="list-content-wrapper">
              <div class="country-name-wrapper">
                <div class="image-wrapper">
                  <img
                    class="flag"
                    :src="country.countryInfo.flag"
                    :title="country.country + ' Flag'"
                    :alt="country.country + ' Flag'"
                  />
                </div>
                <h3 class="country-name">{{ country.country }}</h3>
              </div>
              <div class="value-wrapper total-cases">
                <span class="value">{{ country.cases | numberWithCommas }}</span>
                <span class="secondary-info" v-if="country.todayCases">
                  <span
                    class="secondary-info__value"
                  >{{ country.todayCases > 0 ? "+" + country.todayCases : ("-" + country.todayCases) | numberWithCommas }}</span>
                </span>
              </div>
              <div class="value-wrapper total-deaths">
                <span class="value">{{ country.deaths | numberWithCommas }}</span>
                <span class="secondary-info" v-if="country.todayDeaths">
                  <span
                    class="secondary-info__value"
                  >{{ country.todayDeaths > 0 ? "+" + country.todayDeaths : ("-" + country.todayDeaths) | numberWithCommas }}</span>
                </span>
              </div>
              <div class="value-wrapper total-recovered">
                <span class="value">{{ country.recovered | numberWithCommas }}</span>
                <span class="secondary-info" v-if="country.todayRecovered > 0">
                  <span
                    class="secondary-info__value"
                  >{{ ("+" + country.todayRecovered) | numberWithCommas }}</span>
                </span>
              </div>
              <div class="value-wrapper active-cases">
                <span class="value">{{ country.active | numberWithCommas }}</span>
                <span class="secondary-info" v-if="country.critical">
                  <span class="secondary-info__value">{{ country.critical | numberWithCommas }}</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sticky from "vue-sticky-directive";

export default {
  props: {
    dataCountries: {
      type: Array
    },
    dataYesterday: {
      type: Array
    }
  },
  data() {
    return {
      searchedCountry: ""
    };
  },
  directives: { Sticky },
  filters: {
    numberWithCommas(value) {
      return typeof value != "undefined"
        ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "";
    }
  },
  computed: {
    updateDataCountries() {
      let cloneDataCountries = [...this.dataCountries];
      let recoveredYesterday = this.dataYesterday.map(el => el.recovered);

      cloneDataCountries.forEach(
        (el, i) => (el.todayRecovered = el.recovered - recoveredYesterday[i])
      );
      return cloneDataCountries;
    },
    filteredCountries() {
      return this.updateDataCountries.filter(country => {
        return country.country
          .toLowerCase()
          .match(this.searchedCountry.toLowerCase());
      });
    }
  },
  methods: {
    cleanSearchCountry() {
      this.searchedCountry = "";
      document.querySelector("input").focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.countries-stats {
  @include margin-top(100px);

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    @include margin-top(30px);

    .search-icon {
      width: 18px;
      height: 18px;
      position: absolute;
      left: 15px;

      path {
        fill: #c1c6cc;
      }
    }

    input {
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      outline: none;
      appearance: none;
      border: none;
      box-shadow: 0px 0px 0px 1px #d4d8dc;
      border-radius: 4px;
      padding: 20px 20px 20px 45px;
      @include f-regular;
      @include font-size(16px);
      color: #000;

      &:focus {
        box-shadow: 0px 0px 0px 1px #a2acb7;

        + .search-icon {
          path {
            fill: #a2acb7;
          }
        }
      }

      @include input-placeholder {
        @include f-regular;
        @include font-size(16px);
        color: #aab3bd;
      }
    }

    button {
      position: absolute;
      right: 12px;
      padding: 0;
      margin: 0;
      border-radius: 2px;
      @include f-medium;
      @include font-size(12px);
      text-transform: uppercase;
      appearance: none;
      padding: 10px;
      border: none;
      background-color: #a2acb7;
      color: #fff;
      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          background-color: #868f98;
        }
      }
    }
  }

  .scroll-container {
    position: relative;
    width: 100%;

    @media only screen and (max-width: 970px) {
      overflow-x: scroll;
    }

    .scroll-inner {
      min-width: 970px;
    }
  }

  &__bar {
    position: relative;
    @include margin-top(60px);
    z-index: 1;
    min-width: 970px;

    ul {
      display: grid;
      grid-template-columns: 50px 180px 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 8px;
      padding: 20px;
      background-color: #eef3f9;
      border-radius: 2px;
      box-shadow: 0px 1px 2px 0px rgba(51, 73, 103, 0.15);

      li {
        @include f-medium;
        @include font-size(15px);

        &:first-child {
          position: relative;
          left: -20px;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  &__list {
    @include margin-top(20px);

    &-item {
      display: grid;
      grid-template-columns: 50px auto;
      grid-template-rows: auto;
      gap: 8px;
      @include margin-bottom(20px);

      .list-number {
        display: flex;
        align-items: center;
        justify-content: center;
        @include f-medium;
        @include font-size(16px);
        background-color: #eef3f9;
        border-radius: 2px;
        box-shadow: 0px 1px 2px 0px rgba(51, 73, 103, 0.15);
      }

      .list-content-wrapper {
        display: grid;
        grid-template-columns: 180px 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0px 0px 6px 0px rgba(154, 170, 191, 0.25);
        border-radius: 4px;
        gap: 10px;

        .value-wrapper {
          display: flex;
          align-items: center;
          @include f-medium;
          @include font-size(16px);
          // color: #fff;
          // padding: 10px;
          border-radius: 2px;

          .secondary-info {
            display: flex;
            align-items: center;
            margin-left: 10px;

            &__value {
              display: block;
              @include f-medium;
              @include font-size(14px);
              background-color: #fff;
              border-radius: 2px;
              padding: 5px;
              color: #fff;
            }
          }

          &.total-cases {
            // background-color: #8870ff;
            .secondary-info {
              &__value {
                background-color: #8870ff;
                color: #fff;
              }
            }
          }

          &.active-cases {
            // background-color: #fcb941;

            .secondary-info {
              &__value {
                background-color: #fcb941;
                color: #fff;
              }
            }
          }

          &.total-deaths {
            // background-color: #f1654c;

            .secondary-info {
              &__value {
                background-color: #f1654c;
                color: #fff;
              }
            }
          }

          &.total-recovered {
            // background-color: #2cc990;

            .secondary-info {
              &__value {
                background-color: #2cc990;
                color: #fff;
              }
            }
          }
        }

        .country-name-wrapper {
          display: flex;
          align-items: center;

          .image-wrapper {
            position: relative;
            min-width: 30px;
            width: 30px;
            height: 20px;
            overflow: hidden;
            border-radius: 2px;

            .flag {
              position: absolute;
              width: 100%;
              height: 100%;
              max-width: 30px;
              object-fit: cover;
              object-position: center;
            }
          }

          .country-name {
            @include f-medium;
            @include font-size(16px);
            line-height: 1.2;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.title {
  display: block;
  width: 100%;
  @include f-medium;
  @include font-size(32px);
  margin-left: -1px;
  line-height: 1.2;
}
</style>
