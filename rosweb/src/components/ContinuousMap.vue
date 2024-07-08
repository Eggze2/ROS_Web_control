<template>
  <div id="app">
    <header>
      <h1>Continuous Map</h1>
    </header>
    <div id="main-content">
      <div id="map-container">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContinuousMap',
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    }).catch(error => {
      console.error("Error loading scripts:", error);
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
        divID: 'map',
        width: '800',
        height: '600',
        antialias: true,
        background: '#808080' // 设置背景颜色
      });

      new window.ROS3D.OccupancyGridClient({
        ros: ros,
        rootObject: viewer.scene,
        continuous: true,
        color: {r: 255, g: 255, b: 255, a: 1}, // 设置地图颜色
        opacity: 0.7 // 设置透明度以达到 RViz 的效果
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  background-color: #3f51b5;
  color: white;
  padding: 1rem;
  text-align: center;
}

#main-content {
  display: flex;
  flex: 1;
  justify-content: center; /* 将内容水平居中 */
  align-items: center; /* 将内容垂直居中 */
  padding: 1rem;
  background-color: #f5f5f5;
}

#map-container {
  display: flex;
  justify-content: center; /* 将地图容器水平居中 */
  align-items: center; /* 将地图容器垂直居中 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

#map {
  width: 800px; /* 固定宽度 */
  height: 600px; /* 固定高度 */
}
</style>
