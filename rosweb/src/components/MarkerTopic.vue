<template>
  <div id="app">
    <div id="markers"></div>
  </div>
</template>

<script>
export default {
  name: 'MarkerTopic',
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/three.min.js',
        '/js/eventemitter2.js',
        '/js/roslib.js',
        '/js/ros3d.js'
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

      const viewer = new window.ROS3D.Viewer({
        divID: 'markers',
        width: 800,
        height: 600,
        antialias: true
      });

      const tfClient = new window.ROSLIB.TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: '/my_frame'
      });

      new window.ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: '/visualization_marker',
        rootObject: viewer.scene
      });
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#markers {
  width: 800px;
  height: 600px;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>