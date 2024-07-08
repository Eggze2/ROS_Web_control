<template>
  <div class="container">
    <div id="joyDiv" class="joy-container">
      <!-- Image reference is removed to avoid broken image icon -->
    </div>
    <div class="input-container">
      <label for="posizioneX">Posizione X:</label>
      <input id="posizioneX" type="text" />
      <br>
      <label for="posizioneY">Posizione Y:</label>
      <input id="posizioneY" type="text" />
      <br>
      <label for="direzione">Direzione:</label>
      <input id="direzione" type="text" />
      <br>
      <label for="X">X:</label>
      <input id="X" type="text" />
      <br>
      <label for="Y">Y:</label>
      <input id="Y" type="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoyControl',
  mounted() {
    this.loadScripts().then(() => {
      this.setupJoyStick();
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/eventemitter2.js',
        '/js/roslib.js',
        '/js/mjpegcanvas.min.js',
        '/js/joy.js' // Ensure joy.js is included
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
    setupJoyStick() {
      const joy = new window.JoyStick('joyDiv');

      const inputPosX = document.getElementById("posizioneX");
      const inputPosY = document.getElementById("posizioneY");
      const direzione = document.getElementById("direzione");
      const x = document.getElementById("X");
      const y = document.getElementById("Y");

      setInterval(() => { inputPosX.value = joy.GetPosX(); }, 50);
      setInterval(() => { inputPosY.value = joy.GetPosY(); }, 50);
      setInterval(() => { direzione.value = joy.GetDir(); }, 50);
      setInterval(() => { x.value = joy.GetX(); }, 50);
      setInterval(() => { y.value = joy.GetY(); }, 50);
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
  height: 100vh;
  background-color: #1e1e1e;
}

.joy-container {
  width: 300px;
  height: 300px;
  border: 2px solid #2b2b2b;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 20px 0;
  color: #ffffff;
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 10px;
}

.input-container label {
  margin-bottom: 5px;
  font-weight: bold;
}

.input-container input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #444444;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
}
</style>
