<template>
  <div id="nav2d"></div>
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
          divID: 'nav2d',
          width: 2016,
          height: 3680
        });

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
#nav2d {
  width: 100%;
  height: 100%;
}
</style>