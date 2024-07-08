<template>
    <div id="viewer"></div>
  </template>
  
  <script>
  import ROSLIB from 'roslib';
  import ROS3D from 'ros3d';
  
  export default {
    name: 'ViewerComponent',
    mounted() {
      const ros = new ROSLIB.Ros({
        url: 'ws://localhost:9090'
      });
  
      const viewer = new ROS3D.Viewer({
        divID: 'viewer',
        width: 800,
        height: 600,
        antialias: true
      });
  
      viewer.addObject(new ROS3D.Grid());
  
      const tfClient = new ROS3D.TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 10.0
      });
  
      new ROS3D.UrdfClient({
        ros: ros,
        tfClient: tfClient,
        path: 'http://localhost:8000/',
        rootObject: viewer.scene
      });
    }
  };
  </script>
  
  <style scoped>
  #viewer {
    width: 100%;
    height: 100%;
  }
  </style>
  