<template>
  <div id="app">
    <header>
      <h1>Camera Point Cloud</h1>
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
  name: 'PointCloud',
  data() {
    return {
      ros: null,
      viewer: null,
      pointCloud: null,
      tfClient: null,
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.setupPointCloud();
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
    setupPointCloud() {
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
        fixedFrame: '/camera'
      });

      // Setup PointCloud2 stream
      this.pointCloud = new window.ROS3D.PointCloud2({
        ros: this.ros,
        tfClient: this.tfClient,
        topic: '/camera/depth/points', // 修改为正确的点云话题
        rootObject: this.viewer.scene,
        max_pts: 180000,
        material: { size: 0.05, color: 0xffffff } // 调整点云的显示
      });

      this.pointCloud.subscribe((message) => {
        if (message && message.fields) {
          const positions = message.fields.find(field => field.name === 'x');
          if (positions) {
            const valid = positions.every(value => !isNaN(value));
            if (!valid) {
              console.error("Invalid point cloud data detected.");
              this.cleanup();
            } else {
              this.viewer.addObject(this.pointCloud);
            }
          }
        }
      });
    },
    cleanup() {
      // Cleanup resources
      if (this.pointCloud) {
        this.pointCloud.unsubscribe();
        this.pointCloud = null;
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
  justify-content: center; /* 将点云容器水平居中 */
  align-items: center; /* 将点云容器垂直居中 */
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
