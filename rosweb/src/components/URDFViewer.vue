<template>
    <div class="urdf-viewer">
      <h1>URDF Parsing Example</h1>
      <pre>{{ urdfInfo }}</pre> <!-- Add a preformatted block to display the URDF model -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'URDFViewer',
    data() {
      return {
        urdfInfo: '' // Add data property to hold URDF information
      };
    },
    mounted() {
      this.loadScripts().then(() => {
        this.initROS();
      }).catch(error => {
        console.error('Error loading scripts:', error);
      });
    },
    methods: {
      loadScripts() {
        const scripts = [
          './js/eventemitter2.js',
          './js/roslib.js'
        ];
  
        return Promise.all(
          scripts.map(script => {
            return new Promise((resolve, reject) => {
              const scriptElement = document.createElement('script');
              scriptElement.src = script;
              scriptElement.onload = resolve;
              scriptElement.onerror = () => reject(new Error(`Failed to load script: ${script}`));
              document.head.appendChild(scriptElement);
            });
          })
        );
      },
      initROS() {
        var ros = new window.ROSLIB.Ros({
          url: 'ws://localhost:9090'
        });
  
        var param = new window.ROSLIB.Param({
          ros: ros,
          name: 'robot_description'
        });
  
        param.get((paramValue) => {
          if (!paramValue) {
            console.error('Failed to get param: robot_description is empty or undefined');
            return;
          }
  
          try {
            var urdfModel = new window.ROSLIB.UrdfModel({
              string: paramValue
            });
            this.urdfInfo = JSON.stringify(urdfModel, null, 2); // Store the URDF model in urdfInfo
          } catch (error) {
            console.error('Error creating UrdfModel:', error);
          }
        });
  
        ros.on('connection', function() {
          console.log('Connected to websocket server.');
        });
  
        ros.on('error', function(error) {
          console.log('Error connecting to websocket server: ', error);
        });
  
        ros.on('close', function() {
          console.log('Connection to websocket server closed.');
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .urdf-viewer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  pre {
    text-align: left;
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 80%;
    overflow-x: auto;
  }
  </style>
  