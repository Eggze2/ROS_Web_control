<template>
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
  </template>
  
  <script>
  export default {
    name: 'KeyboardTeleop',
    data() {
      return {
        lastKey: null
      };
    },
    mounted() {
      this.loadScripts().then(() => {
        this.init();
        window.addEventListener('keydown', this.handleKeyDown);
      });
    },
    methods: {
      loadScripts() {
        const scripts = [
          '/js/eventemitter2.js',
          '/js/roslib.js',
          '/js/mjpegcanvas.min.js'
        ];
        const loadScript = src => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };
        return Promise.all(scripts.map(loadScript));
      },
      init() {
        // Initialize any necessary functionality
      },
      handleKeyDown(event) {
        const keys = ['w', 'a', 's', 'd'];
        const key = event.key.toUpperCase();
        if (keys.includes(key.toLowerCase())) {
          this.lastKey = key;
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: #000000; /* Black background color */
    color: #ffffff; /* White text color */
    font-family: Arial, sans-serif; /* Font style */
    font-size: 24px; /* Increased font size */
  }
  
  .keyboard-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px; /* Adjusted margin top to move keyboard down */
  }
  
  .keys {
    display: grid;
    grid-template-areas:
      ". w ."
      "a s d";
    grid-template-columns: 60px 60px 60px; /* Set the width of each column */
    grid-template-rows: 60px 60px; /* Set the height of each row */
    grid-gap: 10px; /* Adjust gap between keys as necessary */
  }
  
  .key {
    width: 60px; /* Set the width of each key */
    height: 60px; /* Set the height of each key */
    border: 1px solid #3a3a3a; /* Light gray border color */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2e2e2e; /* Light gray key background color */
    transition: background-color 0.3s ease;
    color: #ffffff; /* White text color */
  }
  
  .active {
    background-color: #555555; /* Highlight color when key is active */
  }
  
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px; /* Adjust this value to move the text further down */
  }
  
  .title {
    margin: 30px 0; /* Larger top and bottom margin for title */
    font-size: 36px; /* Larger title font size */
  }
  
  .key-press {
    margin: 20px 0; /* Larger top and bottom margin for key press text */
    font-size: 28px; /* Larger key press text font size */
  }
  
  .result-container {
    background-color: #333333;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .result-container h3, .result-container p {
    margin: 10px 0;
  }
  </style>
  