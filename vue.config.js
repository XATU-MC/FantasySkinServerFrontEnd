const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    performance: {
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
    }
  }
});
