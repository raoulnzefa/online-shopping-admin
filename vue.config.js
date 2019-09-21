"use strict";
const path = require("path");

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src")
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(path.join(__dirname, "src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-map")
    );

    config.when(process.env.NODE_ENV != "development", config => {
      config.optimization.runtimeChunk("single");
    });
  },
  devServer: {
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    port: 8080
  }
};
