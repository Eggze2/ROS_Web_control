<template>
  <div id="app">
    <header>
      <h1>navigation</h1>
      <div id="rosStatus" class="disconnected_state">Connecting...</div>
    </header>
    <div id="nav-content">
      <div id="nav-container">
        <div id="nav"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Nav2D',
  mounted() {
    this.loadScripts().then(() => {
      this.$nextTick(() => {
        this.init();
      });
    });
  },
  methods: {
    loadScripts() {
      const scripts = [
        '/js/three.min.js',
        '/js/eventemitter2.js',
        '/js/easeljs.js',
        '/js/roslib.js',
        '/js/ros2d.js',
        '/js/ros3d.js',
        '/js/RosCanvas.js',
        '/js/goalPoint.js',
        '/js/pointCloud.js',
        '/js/NavigationArrow.js',
        '/js/Nav.js',
        '/js/ClientNav.js',
        '/js/Navigator.js',
        '/js/NavController.js',
        '/js/Scan.js'        
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

      const viewer = new window.ROS2D.Viewer({
          divID: 'nav',
          width: 800,
          height: 600,
          antialias: true,
          background: '#808080' // 设置背景颜色
        });
      // const viewer = new window.ROS3D.Viewer({
      //   divID: 'nav',
      //   width: '800',
      //   height: '600',
      //   antialias: true,
      //   background: '#808080' // 设置背景颜色
      // });
      // new window.ROS3D.OccupancyGridClient({
      //   ros: ros,
      //   rootObject: viewer.scene,
      //   continuous: true,
      //   color: {r: 255, g: 255, b: 255, a: 1}, // 设置地图颜色
      //   opacity: 0.7 // 设置透明度以达到 RViz 的效果
      // });

      new window.NAV.OccupancyGridClientNav({
          ros : ros,
          rootObject : viewer.scene,
          viewer : viewer,
          serverName : '/move_base'
        })
      new window.NAV.controller(ros,'/cmd_vel_mux/input/teleop', 'controller_show_div')
      const showTopics = new window.SCAN.topicShowAll(ros,"show_all");
          // pointCloud Scan
      const cloudScan = new window.SCAN.cloudScan({
          ros : ros,
          robotName : '/robot_pose',
          // scanName: '/scan',
          // scanType: 'sensor_msgs/LaserScan',
          scanName: '/move_base/global_costmap/obstacle_layer/clearing_endpoints',
          scanType: 'sensor_msgs/PointCloud',
          isPointedCloud: true
        })

      ros.on('error', function(error) {
          document.querySelector('#rosStatus').className = ("error_state");
          document.querySelector('#rosStatus').innerText = "Error in the backend!";
          console.log("[Rosbridge connect] ERROR:",error);
      });
    
      // Find out exactly when we made a connection.
      ros.on('connection', function() {
        console.log('Connection made!');
        showTopics.update();
        viewer.scene.addChild(cloudScan.poindCloud);
        document.querySelector('#rosStatus').className = ("connected_state");
        document.querySelector('#rosStatus').innerText = " Connected.";
      });
    
      ros.on('close', function() {
        console.log('Connection closed.');
        document.querySelector('#rosStatus').className = ("");
        document.querySelector('#rosStatus').innerText = " Connection closed.";
      });
    
    
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); /* 渐变背景 */
  color: #333;
}

header {
  background-color: #303f9f; /* 深蓝色背景 */
  color: #fff;
  padding: 1.5rem;
  text-align: center;
  font-size: 2.5rem; /* 更大的标题字体 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 更明显的阴影 */
  position: relative;
}

#rosStatus {
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* 平滑的过渡效果 */
}

.connected_state {
  background-color: #4caf50;
  color: #fff;
}

.error_state {
  background-color: #f44336;
  color: #fff;
}

.disconnected_state {
  background-color: #ff9800;
  color: #fff;
}

#nav-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

#nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff; /* 白色背景 */
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* 增强的阴影效果 */
  padding: 20px; /* 增加内边距 */
  transition: transform 0.3s ease, background-color 0.3s ease; /* 增加平滑的过渡效果 */
}

#nav-container:hover {
  transform: scale(1.05); /* 放大效果 */
  background-color: #e0e0e0; /* 背景颜色变化 */
}

#nav {
  width: 800px; /* 固定宽度 */
  height: 600px; /* 固定高度 */
  border: 1px solid #ccc; /* 添加细边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  border-radius: 8px; /* 圆角效果 */
}

</style>