<template>
  <div class="container">
    <p>Vector and Quaternion operations will be shown in the console.</p>
    <div class="result-container">
      <h3>Vector Operations Result:</h3>
      <div v-for="(value, key) in vectorResult" :key="key" class="result-item">
        <label>{{ key }}:</label>
        <input type="text" v-model="vectorResult[key]" readonly />
      </div>
    </div>
    <div class="result-container">
      <h3>Quaternion Operations Result:</h3>
      <div v-for="(value, key) in quaternionResult" :key="key" class="result-item">
        <label>{{ key }}:</label>
        <input type="text" v-model="quaternionResult[key]" readonly />
      </div>
    </div>
    <div class="result-container">
      <h3>Pose Result:</h3>
      <div v-for="(value, key) in poseResult" :key="key" class="result-item">
        <label>{{ key }}:</label>
        <input type="text" v-model="poseResult[key]" readonly />
      </div>
    </div>
  </div>
</template>

<script>
import ROSLIB from 'roslib';

export default {
  name: 'MathOperations',
  data() {
    return {
      vectorResult: {},
      quaternionResult: {},
      poseResult: {}
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
          scripts.map((src) => {
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = src;
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
          })
      );
    },
    init() {
      const v1 = new ROSLIB.Vector3({
        x: 1,
        y: 2,
        z: 3
      });
      const v2 = v1.clone();
      v1.add(v2);
      console.log(v1);
      this.vectorResult = { x: v1.x, y: v1.y, z: v1.z };

      const q1 = new ROSLIB.Quaternion({
        x: 0.1,
        y: 0.2,
        z: 0.3,
        w: 0.4
      });
      const q2 = q1.clone();
      q1.multiply(q2);
      q1.invert();
      console.log(q1);
      this.quaternionResult = { x: q1.x, y: q1.y, z: q1.z, w: q1.w };

      const p = new ROSLIB.Pose({
        position: v1,
        orientation: q1
      });
      console.log(p);
      this.poseResult = {
        'Position - x': p.position.x,
        'Position - y': p.position.y,
        'Position - z': p.position.z,
        'Orientation - x': p.orientation.x,
        'Orientation - y': p.orientation.y,
        'Orientation - z': p.orientation.z,
        'Orientation - w': p.orientation.w
      };

      const tf = new ROSLIB.Transform({
        translation: v2,
        rotation: q2
      });
      p.applyTransform(tf);
      console.log(p);
      this.poseResult = {
        'Position - x': p.position.x,
        'Position - y': p.position.y,
        'Position - z': p.position.z,
        'Orientation - x': p.orientation.x,
        'Orientation - y': p.orientation.y,
        'Orientation - z': p.orientation.z,
        'Orientation - w': p.orientation.w
      };
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
  text-align: center;
}

.result-container {
  margin: 20px 0;
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
}

.result-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-item label {
  margin-bottom: 5px;
  font-weight: bold;
}

.result-item input {
  padding: 5px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  width: 100%;
  text-align: center;
}
</style>
