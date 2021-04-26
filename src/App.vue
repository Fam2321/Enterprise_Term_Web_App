<template>
  <div id="app">
    <h1>Covid Report</h1>
    <div class="row">
      <div id="s" class="col-xs-3 col-sm-3">
        <div class="card-default">
          <p>ติดเชื้อสะสม</p>
          <h1>{{ today.confirmed[0] }}</h1>
        </div>
      </div>
      <div id="s" class="col-xs-3 col-sm-3">
        <div class="card-default">
          <p>หายแล้ว</p>
          <h1>{{ today.recovered[0] }}</h1>
        </div>
      </div>
      <div id="s" class="col-xs-3 col-sm-3">
        <div class="card-default">
          <p>รักษาอยู่ใน รพ.</p>
          <h1>{{ today.hospitalized[0] }}</h1>
        </div>
      </div>
      <div id="s" class="col-xs-3 col-sm-3">
        <div class="card-default">
          <p>เสียชีวิต</p>
          <h1>{{ today.deaths[0] }}</h1>
        </div>
      </div>
    </div>
    <div>
      <canvas id="myChart" style="width: 90%; height: 680px"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

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
          self.sum = result.provinces.provinces.slice(0, 10);
        });
      });
    },
    getChart() {
      var ctx = document.getElementById("myChart").getContext("2d");
      var data = [];
      var label = [];
      for (var i in this.sum) {
        label.push(this.sum[i].name);
        data.push(this.sum[i].population);
      }
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: "Population",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      console.log(myChart);
    },
  },
  async mounted() {
    await this.getReport();
    await this.getSum();
    this.getChart();
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
}
</style>
