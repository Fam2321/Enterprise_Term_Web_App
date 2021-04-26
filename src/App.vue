<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    {{ today }}
    <br />
    {{ sum }}
  </div>
</template>

<script>
export default {
  name: "App",
  dependencies: ["resorceService"],
  data: () => ({
    today: {},
    sum: {},
  }),
  methods: {
    async getReport() {
      var parseString = require("xml2js").parseString;
      await this.resorceService.getReportToday().then((response) => {
        var self = this;
        parseString(response.data, function (err, result) {
          self.today = result.dailyReports;
        });
      });
    },
    async getSum() {
      var parseString = require("xml2js").parseString;
      await this.resorceService.getReportSum().then((response) => {
        var self = this;
        parseString(response.data, function (err, result) {
          self.sum = result.provinces.provinces;
        });
      });
    },
  },
  async mounted() {
    await this.getReport();
    await this.getSum();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
