<template>
  <div class="viewer-container">
    <div id="mjpeg" class="viewer"></div>
  </div>
</template>

<script>
export default {
  name: 'MultiStream',
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/eventemitter2.js',
        '/js/roslib.js',
        '/js/mjpegcanvas.min.js'
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
      this.viewer = new window.MJPEGCANVAS.MultiStreamViewer({
        divID: 'mjpeg',
        host: 'localhost',
        port: 9000,
        width: 640,
        height: 480,
        topics: [
          '/camera/image_raw',
          '/l_forearm_cam/image_color',
          '/r_forearm_cam/image_color'
        ],
        labels: [
          'Robot View',
          'Left Arm View',
          'Right Arm View'
        ]
      });
    }
  }
};
</script>

<style scoped>
.viewer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
}

.viewer {
  border: 2px solid #3f51b5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 4px;
}
</style>
