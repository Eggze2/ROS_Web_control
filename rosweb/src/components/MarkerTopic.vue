<template>
  <div class="marker-container">
    <h1>Simple Marker Example</h1>
    <div id="markers"></div>
  </div>
</template>

<script>
export default {
  name: 'MarkerTopic',
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    }).catch(error => {
      console.error('Error loading scripts:', error);
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        './js/three.min.js',
        './js/eventemitter2.min.js',
        './js/roslib.min.js',
        './js/ros3d.min.js'
      ];

      return Promise.all(
        scripts.map(script => {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.onload = resolve;
            scriptElement.onerror = () => reject(new Error(`Failed to load script: ${script}`));
            document.head.appendChild(scriptElement);
          });
        })
      );
    },
    init() {
      try {
        // Connect to ROS.
        const ros = new window.ROSLIB.Ros({
          url: 'ws://localhost:9090'
        });

        // Create the main viewer.
        const viewer = new window.ROS3D.Viewer({
          divID: 'markers',
          width: 800,
          height: 600,
          antialias: true
        });

        // Setup a client to listen to TFs.
        const tfClient = new window.ROSLIB.TFClient({
          ros: ros,
          angularThres: 0.01,
          transThres: 0.01,
          rate: 10.0,
          fixedFrame: '/my_frame'
        });

        // Setup the marker client.
        new window.ROS3D.MarkerClient({
          ros: ros,
          tfClient: tfClient,
          topic: '/visualization_marker',
          rootObject: viewer.scene
        });
      } catch (error) {
        console.error('Error initializing ROS3D Viewer:', error);
      }
    }
  }
};
</script>

<style scoped>
.marker-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  height: 100vh; /* Full viewport height */
}

#markers {
  width: 800px;
  height: 600px;
}
</style>
