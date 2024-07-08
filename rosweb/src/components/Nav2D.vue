<template>
  <div id="nav2d"></div>
</template>

<script>
export default {
  name: 'Nav2D',
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/roslib.js',
        '/js/ros2d.min.js',
        '/js/nav2d.min.js'
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

      const viewer = new window.ROS2D.Viewer({
        divID: 'nav2d',
        width: 800,
        height: 600
      });

      new window.NAV2D.OccupancyGridClientNav({
        ros: ros,
        rootObject: viewer.scene,
        viewer: viewer,
        continuous: true
      });
    }
  }
};
</script>

<style scoped>
#nav2d {
  width: 100%;
  height: 100%;
}
</style>
