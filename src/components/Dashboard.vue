<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <span class="subtitle">Dados Estatísticos</span>
        <h2 class="title">Covid-19 em Portugal</h2>
      </div>
    </header>
    <main class="dashboard-content">
      <div class="container">
        <span class="update-title">
          <span class="radar"></span>
          Atualizado às {{ new Date(data.updated) }}
        </span>
        <div class="container-row">
          <div class="card casos-diarios">
            <p class="value">{{ data.todayCases }}</p>
            <h3 class="type">Casos de hoje</h3>
          </div>
          <div class="card morte-diaria">
            <p class="value">{{ data.todayDeaths }}</p>
            <h3 class="type">Mortes de hoje</h3>
          </div>
          <div class="card recuperados">
            <p class="value">{{ data.recovered }}</p>
            <h3 class="type">Recuperados</h3>
          </div>
          <div class="card total">
            <p class="value">{{ data.cases }}</p>
            <h3 class="type">Total de casos</h3>
          </div>
        </div>
        <!-- Casos
        Total Mortes
        <h3>{{ data.deaths }}</h3>

        Casos Activos
        <h3>{{ data.active }}</h3>
        Casos criticos
        <h3>{{ data.critical }}</h3>
        Testados
        <h3>{{ data.tests }}</h3> -->
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: {},
      loading: true,
    };
  },
  created() {
    this.fecthData();
  },
  methods: {
    fecthData() {
      axios
        .get(`https://disease.sh/v2/countries/Portugal`)
        .then((response) => {
          this.data = response.data;
        })
        .catch(() => {})
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-header {
  @include padding(200px 0 200px);
  background-color: #f2f7fd;

  .subtitle {
    display: block;
    @include f-medium;
    @include font-size(16px);
  }

  .title {
    display: block;
    max-width: 45%;
    width: 100%;
    @include f-medium;
    @include font-size(46px);
    @include margin-top(10px);
    margin-left: -1px;
    line-height: 1.2;
  }
}
.dashboard-content {
  @include margin-top(-80px);

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

  .container-row {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    gap: 1em 1em;

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
  }
}
</style>
