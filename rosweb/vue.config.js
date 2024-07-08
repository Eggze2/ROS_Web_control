const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/stream': {
        target: 'http://localhost:8080', // Target server where your backend is running
        changeOrigin: true,
        pathRewrite: { '^/stream': '' }, // Optionally, remove the base path
        logLevel: 'debug' // Optional: for logging proxy details
      }
    }
  }
});
