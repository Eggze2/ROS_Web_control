<template>
  <div class="tf-viewer">
    <h1>Simple TF Example</h1>
    <p>Check the output below for TF data:</p>
    <pre>{{ tfData }}</pre>
  </div>
</template>

<script>
export default {
  name: 'TfViewer',
  data() {
    return {
      tfData: ''
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/eventemitter2.min.js',
        '/js/roslib.min.js'
      ];

      return Promise.all(
        scripts.map(script => {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.onload = resolve;
            scriptElement.onerror = reject;
            document.head.appendChild(scriptElement);
          });
        })
      );
    },
    init() {
      const ros = new window.ROSLIB.Ros({
        url: 'ws://localhost:9090'
      });

      const tfClient = new window.ROSLIB.TFClient({
        ros: ros,
        fixedFrame: 'world',
        angularThres: 0.01,
        transThres: 0.01
      });

      tfClient.subscribe('turtle1', (tf) => {
        this.tfData = JSON.stringify(tf, null, 2);
      });

      ros.on('connection', () => {
        console.log('Connected to websocket server.');
      });

      ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
      });

      ros.on('close', () => {
        console.log('Connection to websocket server closed.');
      });
    }
  }
};
</script>

<style scoped>
.tf-viewer {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
