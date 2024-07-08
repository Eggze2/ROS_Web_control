<template>
  <div id="app">
    <header>
      <h1>Camera Image</h1>
    </header>
    <div id="main-content">
      <div id="image-container">
        <img id="image-viewer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraImageViewer',
  data() {
    return {
      lastUpdate: 0,
      updateInterval: 100, // 设置更新间隔为100毫秒
      imageTopic: null
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.init();
    }).catch(error => {
      console.error("Error loading scripts:", error);
    });
  },
  beforeDestroy() {
    // 在组件销毁时取消订阅图像话题
    if (this.imageTopic) {
      this.imageTopic.unsubscribe();
    }
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/roslib.js'
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

      this.imageTopic = new window.ROSLIB.Topic({
        ros: ros,
        name: '/camera/image_raw/compressed',
        messageType: 'sensor_msgs/CompressedImage'
      });

      this.imageTopic.subscribe(this.displayImage);
    },
    displayImage(message) {
      const now = Date.now();
      if (now - this.lastUpdate < this.updateInterval) {
        return;
      }
      this.lastUpdate = now;

      const imageViewer = document.getElementById('image-viewer');
      if (imageViewer) {
        imageViewer.src = `data:image/jpeg;base64,${message.data}`;
      } else {
        console.error("imageViewer element not found");
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

#image-container {
  display: flex;
  justify-content: center; /* 将图像容器水平居中 */
  align-items: center; /* 将图像容器垂直居中 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

#image-viewer {
  width: 800px; /* 固定宽度 */
  height: 600px; /* 固定高度 */
}
</style>
