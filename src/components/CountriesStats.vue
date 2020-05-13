<template>
  <div class="countries-stats">
    <h2 class="title">Stats per country</h2>
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search for your country..." />
      <button v-show="search" class="clear-input" @click="cleanInput">clear</button>
    </div>
    <ul class="countries-stats__list">
      <li class="countries-stats__list-item" v-for="(country, index) in filteredCountries" :key="index">
        <div class="list-number">{{ index + 1 }}</div>
        <div class="list-content-wrapper">
          <div class="country-name-wrapper">
            <div class="image-wrapper">
              <img class="flag" :src="country.countryInfo.flag" :title="country.country + ' Flag'" :alt="country.country + ' Flag'" />
            </div>
            <h3 class="country-name">{{ country.country }}</h3>
          </div>
          <div class="value-wrapper total-cases">
            <span class="value">{{ country.cases | numberWithCommas }}</span>
            <span class="secondary-info" v-if="country.todayCases">
              <span class="secondary-info__value">{{ country.todayCases > 0 ? "+" + country.todayCases : ("-" + country.todayCases) | numberWithCommas }}</span>
            </span>
          </div>
          <div class="value-wrapper total-deaths">
            <span class="value">{{ country.deaths | numberWithCommas }}</span>
            <span class="secondary-info" v-if="country.todayDeaths">
              <span class="secondary-info__value">{{ country.todayDeaths > 0 ? "+" + country.todayDeaths : ("-" + country.todayDeaths) | numberWithCommas }}</span>
            </span>
          </div>
          <div class="value-wrapper total-recovered">
            <span class="value">{{ country.recovered | numberWithCommas }}</span>
            <!-- <span class="secondary-info" v-if="country.recovered - recoveredDataYesterday[index].recovered > 0">
              <span class="secondary-info__value">{{ country.recovered - recoveredDataYesterday[index].recovered > 0 ? "+" + (country.recovered - recoveredDataYesterday[index].recovered) : ("-" + country.recovered - recoveredDataYesterday[index].recovered) | numberWithCommas }}</span>
            </span> -->
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
</template>

<script>
export default {
  props: {
    dataCountries: {
      type: Array,
    },
    dataYesterday: {
      type: Array,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  filters: {
    numberWithCommas(value) {
      return typeof value != "undefined" ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
    },
  },
  computed: {
    recoveredDataYesterday() {
      return this.dataYesterday.map((el) => el.recovered);
    },
    filteredCountries() {
      return this.dataCountries.filter((country) => {
        return country.country.toLowerCase().match(this.search.toLowerCase());
      });
    },
  },
  methods: {
    cleanInput() {
      this.search = "";
      document.querySelector("input").focus();
    },
  },
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
      padding: 20px;
      @include f-regular;
      @include font-size(16px);
      color: #000;

      &:focus {
        box-shadow: 0px 0px 0px 1px #a2acb7;
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

  &__list {
    @include margin-top(40px);

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
        background-color: #eef2f7;
        border-radius: 2px;
      }

      .list-content-wrapper {
        display: grid;
        grid-template-columns: 140px 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0px 0px 16px rgba(17, 17, 26, 0.08);
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
