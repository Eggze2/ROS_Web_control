<template>
  <div id="app">
    <header>
      <h1>Laser Scan</h1>
    </header>
    <div id="main-content">
      <div id="viewer-container">
        <div id="viewer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaserScan',
  data() {
    return {
      ros: null,
      viewer: null,
      tfClient: null,
      laserScan: null,
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.setupLaserScan();
    }).catch(error => {
      console.error("Error loading scripts:", error);
    });
  },
  beforeDestroy() {
    this.cleanup();
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
    setupLaserScan() {
      // Connect to ROS
      this.ros = new window.ROSLIB.Ros({
        url: 'ws://localhost:9090'
      });

      // Create the main viewer
      this.viewer = new window.ROS3D.Viewer({
        divID: 'viewer',
        width: 800,
        height: 600,
        antialias: true,
        background: '#D3D3D3' // 设置背景颜色
      });

      // Setup a client to listen to TFs
      this.tfClient = new window.ROSLIB.TFClient({
        ros: this.ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0,
        fixedFrame: '/laser' // 修改为你的激光扫描数据的固定框架
      });

      // Setup LaserScan stream
      this.laserScan = new window.ROS3D.LaserScan({
        ros: this.ros,
        tfClient: this.tfClient,
        topic: '/scan', // 修改为你的激光扫描话题
        rootObject: this.viewer.scene,
        material: { size: 0.05, color: 0xff0000 } // 调整激光扫描点的显示
      });

      this.viewer.addObject(this.laserScan);
    },
    cleanup() {
      // Cleanup resources
      if (this.laserScan) {
        this.laserScan.unsubscribe();
        this.laserScan = null;
      }
      if (this.tfClient) {
        this.tfClient.dispose();
        this.tfClient = null;
      }
      if (this.viewer) {
        this.viewer.scene.children.forEach(child => {
          this.viewer.scene.remove(child);
        });
        this.viewer = null;
      }
      if (this.ros) {
        this.ros.close();
        this.ros = null;
      }
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

#viewer-container {
  display: flex;
  justify-content: center; /* 将激光扫描容器水平居中 */
  align-items: center; /* 将激光扫描容器垂直居中 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

#viewer {
  width: 800px; /* 固定宽度 */
  height: 600px; /* 固定高度 */
}
</style>
