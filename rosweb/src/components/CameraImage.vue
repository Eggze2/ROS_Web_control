<template>
  <div id="app">
    <header>
      <h1>Camera Image</h1>
    </header>
    <div id="main-content">
      <div id="image-container">
        <img id="image-viewer" />
<<<<<<< HEAD
=======
        <div id="keyboard-teleop">
          <div class="keyboard-container">
            <div class="keys">
              <div :class="{'key': true, 'active': lastKey === 'W'}" style="grid-area: w;">W</div>
              <div :class="{'key': true, 'active': lastKey === 'A'}" style="grid-area: a;">A</div>
              <div :class="{'key': true, 'active': lastKey === 'S'}" style="grid-area: s;">S</div>
              <div :class="{'key': true, 'active': lastKey === 'D'}" style="grid-area: d;">D</div>
            </div>
          </div>
          <div class="text-container">
            <h3 class="title">Keyboard Presses</h3>
            <p v-if="lastKey" class="key-press">You pressed: {{ lastKey }}</p>
          </div>
        </div>
>>>>>>> origin/simulation
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
<<<<<<< HEAD
      imageTopic: null
=======
      imageTopic: null,
      ros: null,
      cmdVel: null,
      lastKey: null
>>>>>>> origin/simulation
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.init();
<<<<<<< HEAD
=======
      this.setupKeyboardControls();
>>>>>>> origin/simulation
    }).catch(error => {
      console.error("Error loading scripts:", error);
    });
  },
  beforeDestroy() {
<<<<<<< HEAD
    // 在组件销毁时取消订阅图像话题
    if (this.imageTopic) {
      this.imageTopic.unsubscribe();
    }
=======
    // 在组件销毁时取消订阅图像话题和移除键盘事件监听器
    if (this.imageTopic) {
      this.imageTopic.unsubscribe();
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
>>>>>>> origin/simulation
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
<<<<<<< HEAD
      const ros = new window.ROSLIB.Ros({
=======
      this.ros = new window.ROSLIB.Ros({
>>>>>>> origin/simulation
        url: 'ws://localhost:9090'
      });

      this.imageTopic = new window.ROSLIB.Topic({
<<<<<<< HEAD
        ros: ros,
=======
        ros: this.ros,
>>>>>>> origin/simulation
        name: '/camera/image_raw/compressed',
        messageType: 'sensor_msgs/CompressedImage'
      });

      this.imageTopic.subscribe(this.displayImage);
<<<<<<< HEAD
=======

      // Initialize cmdVel topic
      this.cmdVel = new window.ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist'
      });
>>>>>>> origin/simulation
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
<<<<<<< HEAD
=======
    },
    setupKeyboardControls() {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    },
    handleKeyDown(event) {
      const keys = ['w', 'a', 's', 'd'];
      const key = event.key.toUpperCase();
      if (keys.includes(key.toLowerCase())) {
        this.lastKey = key;
      }

      let twist = new window.ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 }
      });

      switch (event.key) {
        case 'w':
          twist.linear.x = 0.7;
          break;
        case 's':
          twist.linear.x = -0.7;
          break;
        case 'a':
          twist.angular.z = 0.8;
          break;
        case 'd':
          twist.angular.z = -0.8;
          break;
      }

      this.cmdVel.publish(twist);
    },
    handleKeyUp() {
      let twist = new window.ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 }
      });

      this.cmdVel.publish(twist);
>>>>>>> origin/simulation
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
<<<<<<< HEAD
=======
  flex-direction: column; /* 将图像容器和键盘容器垂直排列 */
>>>>>>> origin/simulation
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
<<<<<<< HEAD
=======

#keyboard-teleop {
  margin-top: 20px; /* 调整键盘容器与图像容器之间的距离 */
}

.keyboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 调整键盘容器的上边距 */
}

.keys {
  display: grid;
  grid-template-areas:
    ". w ."
    "a s d";
  grid-template-columns: 60px 60px 60px; /* 设置每列的宽度 */
  grid-template-rows: 60px 60px; /* 设置每行的高度 */
  grid-gap: 10px; /* 调整按键之间的间距 */
}

.key {
  width: 60px; /* 设置每个按键的宽度 */
  height: 60px; /* 设置每个按键的高度 */
  border: 1px solid #3a3a3a; /* 浅灰色边框 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2e2e2e; /* 浅灰色背景 */
  transition: background-color 0.3s ease;
  color: #ffffff; /* 白色文本 */
}

.active {
  background-color: #555555; /* 激活按键的背景颜色 */
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* 调整文本容器的上边距 */
}

.title {
  margin: 30px 0; /* 调整标题的上下边距 */
  font-size: 36px; /* 调整标题的字体大小 */
}

.key-press {
  margin: 20px 0; /* 调整按键文本的上下边距 */
  font-size: 28px; /* 调整按键文本的字体大小 */
}
>>>>>>> origin/simulation
</style>
