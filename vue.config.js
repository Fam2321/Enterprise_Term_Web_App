module.exports = {
  devServer: {
    port: 3030,
    proxy: "http://localhost:8080/",
  },
};
