<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <span class="subtitle">Statistic data</span>
        <h2 class="title">Covid-19</h2>
        <p class="text">The global stats for the Coronavirus (COVID-19) outbreak, affecting now {{ dataAll.affectedCountries }} countries around the world.</p>
      </div>
    </header>
    <main class="dashboard-content">
      <div class="container">
        <span class="update-title">
          <span class="radar"></span>
          Latest update: {{ dataAll.updated | momentDate }}
        </span>
        <GlobalStats :data="dataAll" :dataYesterday="dataAllYesterday.recovered"></GlobalStats>
        <CountriesStats :dataCountries="dataAllCountries" :dataYesterday="dataAllCountriesYesterday"></CountriesStats>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment/moment";

import GlobalStats from "./GlobalStats";
import CountriesStats from "./CountriesStats";

let globalData = "https://disease.sh/v2/all";
let globalDataYesterday = "https://disease.sh/v2/all?yesterday=true";
let countriesData = "https://disease.sh/v2/countries?sort=cases";
let countriesDataYesterday = "https://disease.sh/v2/countries?yesterday=true&sort=cases";

export default {
  data() {
    return {
      dataAll: {},
      dataAllYesterday: {},
      dataAllCountries: [],
      dataAllCountriesYesterday: [],
      loading: true,
    };
  },
  created() {
    this.getData();
  },
  filters: {
    momentDate(value) {
      return moment(value)
        .locale("en")
        .calendar();
    },
  },
  methods: {
    getData() {
      axios
        .all([axios.get(globalData), axios.get(globalDataYesterday), axios.get(countriesData), axios.get(countriesDataYesterday)])
        .then(
          axios.spread((globalDataResponse, globalDataYesterdayResponse, countriesDataResponse, countriesDataYesterdayResponse) => {
            this.dataAll = globalDataResponse.data;
            this.dataAllYesterday = globalDataYesterdayResponse.data;
            this.dataAllCountries = countriesDataResponse.data;
            this.dataAllCountriesYesterday = countriesDataYesterdayResponse.data;
          })
        )
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
  components: {
    GlobalStats,
    CountriesStats,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-header {
  @include padding(200px 0 200px);
  background-color: #eef3f9;

  .subtitle {
    display: block;
    @include f-medium;
    @include font-size(16px);
  }

  .title {
    display: block;
    width: 100%;
    @include f-medium;
    @include font-size(46px);
    @include margin-top(10px);
    margin-left: -1px;
    line-height: 1.2;
  }

  .text {
    display: block;
    width: 100%;
    @include f-regular;
    @include font-size(16px);
    @include margin-top(10px);
    line-height: 1.4;
    color: #556880;
  }
}
.dashboard-content {
  @include margin-top(-80px);
  @include padding-bottom(50px);

  .update-title {
    display: block;
    @include f-medium;
    @include font-size(16px);
    @include margin-bottom(20px);
    color: #000;
    display: flex;
    align-items: center;

    .radar {
      display: flex;
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background-color: #53df83;
      margin-right: 10px;

      &:before {
        content: "";
        display: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: #53df83;
        animation: radar-animation 1s ease-out infinite;
      }

      @keyframes radar-animation {
        0% {
          box-shadow: 0 0 0 0 rgba(#53df83, 1);
        }
        100% {
          box-shadow: 0 0 0 10px rgba(#53df83, 0);
        }
      }
    }
  }
}
</style>
