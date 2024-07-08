<!-- <template>
    <div id="map"></div>
  </template>
  
  <script>
  import ROSLIB from 'roslib';
  import ROS3D from 'ros3d';
  
  export default {
    name: 'TwoDMapViewer',
    mounted() {
      this.init();
    },
    methods: {
      init() {
        const ros = new ROSLIB.Ros({
          url: 'ws://localhost:9090'
        });
  
        const viewer = new ROS3D.Viewer({
          divID: 'map',
          width: 800,
          height: 600,
          antialias: true
        });
  
        new ROS3D.OccupancyGridClient({
          ros: ros,
          rootObject: viewer.scene
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
  </style>
   -->