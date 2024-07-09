<template>
  <div class="viewer-container">
    <div class="input-container">
      <input type="text" v-model="newTopic" placeholder="Enter topic" />
      <input type="text" v-model="newLabel" placeholder="Enter label" />
      <button @click="addStream">Add Stream</button>
    </div>
    <div id="mjpeg" class="viewer"></div>
  </div>
</template>

<script>
export default {
  name: 'MultiStream',
  data() {
    return {
      newTopic: '',
      newLabel: '',
      topics: [],
      labels: []
    };
  },
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
        topics: this.topics,
        labels: this.labels
      });
    },
    addStream() {
      if (this.newTopic && this.newLabel) {
        this.topics.push(this.newTopic);
        this.labels.push(this.newLabel);
        this.updateViewer();
        this.newTopic = '';
        this.newLabel = '';
      }
    },
    updateViewer() {
      this.viewer.setStreams(this.topics, this.labels);
    }
  }
};
</script>

<style scoped>
.viewer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
}

.input-container {
  display: flex;
  margin-bottom: 20px;
}

.input-container input {
  margin-right: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.input-container button {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background-color: #3f51b5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input-container button:hover {
  background-color: #283593;
}

.viewer {
  border: 2px solid #3f51b5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 4px;
}
</style>
