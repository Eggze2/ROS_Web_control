<template>
  <div class="outer-container">
    <div class="scroll-container">
      <div class="container">
        <p>Enter data for Vector and Quaternion operations:</p>
        <div class="input-container">
          <h3>Vector Input:</h3>
          <div v-for="(value, key) in vectorInput" :key="key" class="input-item">
            <label>{{ key }}:</label>
            <input type="number" v-model.number="vectorInput[key]" />
          </div>
        </div>
        <div class="input-container">
          <h3>Quaternion Input:</h3>
          <div v-for="(value, key) in quaternionInput" :key="key" class="input-item">
            <label>{{ key }}:</label>
            <input type="number" v-model.number="quaternionInput[key]" />
          </div>
        </div>
        <button @click="performOperations">Calculate</button>
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
    </div>
  </div>
</template>

<script>
import ROSLIB from 'roslib';

export default {
  name: 'MathOperations',
  data() {
    return {
      vectorInput: { x: 0, y: 0, z: 0 },
      quaternionInput: { x: 0, y: 0, z: 0, w: 1 },
      vectorResult: {},
      quaternionResult: {},
      poseResult: {}
    };
  },
  mounted() {
    this.loadScripts();
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
    performOperations() {
      const v1 = new ROSLIB.Vector3({
        x: this.vectorInput.x,
        y: this.vectorInput.y,
        z: this.vectorInput.z
      });
      const v2 = v1.clone();
      v1.add(v2);
      console.log(v1);
      this.vectorResult = { x: v1.x, y: v1.y, z: v1.z };

      const q1 = new ROSLIB.Quaternion({
        x: this.quaternionInput.x,
        y: this.quaternionInput.y,
        z: this.quaternionInput.z,
        w: this.quaternionInput.w
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
body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
}

.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.scroll-container {
  width: calc(100% - 250px); /* Adjust width to exclude sidebar */
  max-width: 600px; /* Maximum width to ensure it doesn't get too wide */
  height: 100%;
  overflow-y: auto;
  border-radius: 15px; /* Rounded corners */
  background-color: #1e1e1e;
  margin: 0 auto; /* Center the container */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.input-container,
.result-container {
  margin: 20px 0;
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
}

.input-item,
.result-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-item label,
.result-item label {
  margin-bottom: 5px;
  font-weight: bold;
}

.input-item input,
.result-item input {
  padding: 5px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
  width: 100%;
  text-align: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
}
</style>
