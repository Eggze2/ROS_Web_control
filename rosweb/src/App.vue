<template>
  <div id="app">
    <MonitorPanel />
    <div class="content">
      <component :is="selectedItem.component"></component>
    </div>
    <div class="sidebar">
      <h3 class="panel-title">ROS Web Control Panel</h3>
      <ul>
        <li v-for="item in items" :key="item.id" @click="selectItem(item)" :class="{ selected: selectedItem.id === item.id }">
          {{ item.name }}
        </li>
        <button class="back-button" @click="goBack">Go Back</button>
      </ul>
    </div>
  </div>
</template>

<script>
import ContinuousMap from './components/ContinuousMap.vue';
import CameraPointCloud from './components/CameraPointCloud.vue';
import JoyControl from './components/JoyControl.vue';
import KeyboardControl from './components/KeyboardTeleopControl.vue';
import URDFViewer from './components/URDFViewer.vue';
import TwoDMapViewer from './components/TwoDMapViewer.vue';
import MarkerTopic from './components/MarkerTopic.vue';
import MathComponent from './components/Math.vue';
import MultiStream from './components/MultiStream.vue';
import CameraImage from './components/CameraImage.vue';
import Nav2D from './components/Nav2D.vue';
import LaserScan from './components/LaserScan.vue';
import TfViewer from './components/TfViewer.vue';
import MonitorPanel from './components/MonitorPanel.vue';

export default {
  name: 'App',
  data() {
    return {
      items: [
        { id: 1, name: 'Continuous Map', component: 'ContinuousMap' },
        { id: 2, name: 'Camera Point Cloud', component: 'CameraPointCloud' },
        { id: 3, name: 'Joy Control', component: 'JoyControl' },
        { id: 4, name: 'Keyboard Control', component: 'KeyboardControl' },
        { id: 5, name: 'URDF Viewer', component: 'URDFViewer' },
        { id: 6, name: '2D Map Viewer', component: 'TwoDMapViewer' },
        { id: 7, name: 'Marker Topic', component: 'MarkerTopic' },
        { id: 8, name: 'Math', component: 'MathComponent' },
        { id: 9, name: 'Multi Stream', component: 'MultiStream' },
        { id: 10, name: 'Camera Image', component: 'CameraImage' },
        { id: 11, name: 'Nav2D', component: 'Nav2D' },
        { id: 12, name: 'Laser Scan', component: 'LaserScan' },
        { id: 13, name: 'Tf Viewer', component: 'TfViewer' },
      ],
      selectedItem: { id: 1, component: 'ContinuousMap' },
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    goBack() {
      window.history.back();
    }
  },
  components: {
    ContinuousMap,
    CameraPointCloud,
    JoyControl,
    KeyboardControl,
    URDFViewer,
    TwoDMapViewer,
    MarkerTopic,
    MathComponent,
    MultiStream,
    CameraImage,
    Nav2D,
    LaserScan,
    TfViewer,
    MonitorPanel
  }
};
</script>

<style>
#app {
  display: flex;
  position: relative;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  margin: 0;
}

.sidebar {
  width: 300px;
  background-color: #3f51b5;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-self: center;
  z-index: 1000;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 20px;
  margin: 10px 0;
  background-color: #303f9f;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.sidebar li:hover {
  background-color: #283593;
  transform: scale(1.05);
}

.sidebar li.selected {
  background-color: #1a237e;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  overflow-y: auto;
}

.back-button {
  background-color: #283593;
  color: white;
  padding: 20px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-items: center;
}

.back-button:hover {
  background-color: #1a237e;
}

.panel-title {
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
</style>
