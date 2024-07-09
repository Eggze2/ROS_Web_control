<template>
    <div id="app">
      <header>
        <h1>Point Navigation</h1>
      </header>
      <div id="main-content">
        <div id="form-container">
          <form @submit.prevent="sendGoal">
            <div>
              <label for="x">X:</label>
              <input type="number" v-model.number="x" required />
            </div>
            <div>
              <label for="y">Y:</label>
              <input type="number" v-model.number="y" required />
            </div>
            <div>
              <label for="theta">Theta:</label>
              <input type="number" v-model.number="theta" required />
            </div>
            <button type="submit">Move to Point</button>
          </form>
          <pre>{{ message }}</pre>
          <pre>{{ statusMessage }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PointNavigation',
    data() {
      return {
        x: 0,
        y: 0,
        theta: 0,
        message: '',
        statusMessage: '',
        ros: null,
        goalTopic: null,
        statusTopic: null
      };
    },
    mounted() {
      this.loadScripts().then(() => {
        this.initROS();
      }).catch(error => {
        console.error("Error loading scripts:", error);
      });
    },
    beforeDestroy() {
      if (this.goalTopic) {
        this.goalTopic.unsubscribe();
      }
      if (this.statusTopic) {
        this.statusTopic.unsubscribe();
      }
    },
    methods: {
      loadScripts() {
        const scripts = [
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
      initROS() {
        this.ros = new window.ROSLIB.Ros({
          url: 'ws://localhost:9090'
        });
  
        this.ros.on('connection', () => {
          this.message = 'Connected to websocket server.';
          this.goalTopic = new window.ROSLIB.Topic({
            ros: this.ros,
            name: '/move_base_simple/goal',
            messageType: 'geometry_msgs/PoseStamped'
          });
          this.statusTopic = new window.ROSLIB.Topic({
            ros: this.ros,
            name: '/move_base/status',
            messageType: 'actionlib_msgs/GoalStatusArray'
          });
          this.statusTopic.subscribe(this.checkStatus);
        });
  
        this.ros.on('error', (error) => {
          this.message = 'Error connecting to websocket server: ' + error;
        });
  
        this.ros.on('close', () => {
          this.message = 'Connection to websocket server closed.';
        });
      },
      sendGoal() {
        const goal = new window.ROSLIB.Message({
          header: {
            frame_id: 'map',
            stamp: {}
          },
          pose: {
            position: {
              x: this.x,
              y: this.y,
              z: 0
            },
            orientation: this.quaternionFromYaw(this.theta)
          }
        });
  
        this.goalTopic.publish(goal);
        this.message = `Sent goal: (${this.x}, ${this.y}, ${this.theta})`;
      },
      quaternionFromYaw(yaw) {
        const halfYaw = yaw * 0.5;
        return {
          x: 0,
          y: 0,
          z: Math.sin(halfYaw),
          w: Math.cos(halfYaw)
        };
      },
      checkStatus(status) {
        if (status.status_list && status.status_list.length > 0) {
          const goalStatus = status.status_list[status.status_list.length - 1];
          if (goalStatus.status === 3) {
            this.statusMessage = 'Car has reached the goal!';
          } else {
            this.statusMessage = 'Car is moving to the goal...';
          }
        } else {
          this.statusMessage = 'No active goals.';
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
  
  #form-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* 将表单容器垂直居中 */
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    padding: 2rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  form > div {
    margin: 0.5rem 0;
  }
  
  label {
    margin-right: 0.5rem;
  }
  
  input {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #3f51b5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  button:hover {
    background-color: #303f9f;
  }
  
  pre {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #e0e0e0;
    border-radius: 4px;
    width: 100%;
    text-align: left;
  }
  </style>
  