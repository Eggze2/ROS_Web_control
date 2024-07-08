<template>
  <div class="tf-viewer">
    <h1>TF Viewer</h1>
    <div class="dropdowns">
      <label for="fixed-frame">Fixed Frame:</label>
      <select id="fixed-frame" v-model="fixedFrame" @change="subscribeTf">
        <option v-for="frame in frames" :key="frame" :value="frame">{{ frame }}</option>
      </select>
      <label for="target-frame">Target Frame:</label>
      <select id="target-frame" v-model="targetFrame" @change="subscribeTf">
        <option v-for="frame in frames" :key="frame" :value="frame">{{ frame }}</option>
      </select>
    </div>
    <p>Check the output below for TF data:</p>
    <pre>{{ tfData }}</pre>
  </div>
</template>

<script>
export default {
  name: 'TfViewer',
  data() {
    return {
      tfData: '',
      ros: null,
      tfClient: null,
      fixedFrame: 'odom',
      targetFrame: 'camera',
      frames: ['odom', 'camera', 'back_wheel', 'front_wheel', 'laser', 'left_wheel', 'right_wheel', 'support', 'support_depth']
    };
  },
  mounted() {
    this.loadScripts().then(() => {
      this.init();
      this.subscribeTf();
    });
  },
  beforeDestroy() {
    if (this.tfClient) {
      this.tfClient.unsubscribe(this.targetFrame);
    }
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
      this.ros = new window.ROSLIB.Ros({
        url: 'ws://localhost:9090'
      });

      this.ros.on('connection', () => {
        console.log('Connected to websocket server.');
      });

      this.ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
      });

      this.ros.on('close', () => {
        console.log('Connection to websocket server closed.');
      });
    },
    subscribeTf() {
      if (this.tfClient) {
        this.tfClient.unsubscribe(this.targetFrame);
      }

      this.tfClient = new window.ROSLIB.TFClient({
        ros: this.ros,
        fixedFrame: this.fixedFrame,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0
      });

      this.tfClient.subscribe(this.targetFrame, (tf) => {
        this.tfData = JSON.stringify(tf, null, 2);
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

.dropdowns {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

select {
  margin-right: 20px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
