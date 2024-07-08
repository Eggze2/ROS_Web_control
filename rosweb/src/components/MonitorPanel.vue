<template>
    <div class="monitor-panel" :class="{ open: isOpen }">
      <div
        class="toggle-button"
        @click="togglePanel"
        :class="{ 'button-hover': isHovered }"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div class="arrow" :class="{ 'arrow-right': isOpen, 'arrow-left': !isOpen }"></div>
      </div>
      <iframe v-if="isOpen" src="http://localhost:8888" class="monitor-iframe"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MonitorPanel',
    data() {
      return {
        isOpen: false,
        isHovered: false,
      };
    },
    methods: {
      togglePanel() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .monitor-panel {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 800px; /* Adjust width as needed */
    background-color: #f5f5f5;
    border-right: 2px solid #3f51b5;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    transform: translateX(-100%);
    z-index: 1000;
  }
  
  .monitor-panel.open {
    transform: translateX(0);
  }
  
  .monitor-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .toggle-button {
    position: absolute;
    top: 50%;
    right: -60px; /* Adjust position as needed */
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: #3f51b5;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
  }
  
  .toggle-button:hover,
  .button-hover {
    background-color: #283593;
  }
  
  .arrow {
    position: relative;
    width: 0;
    height: 0;
    border: solid white;
    border-width: 0 4px 4px 0;
    padding: 8px;
    transition: transform 0.3s ease;
    transform-origin: center;
  }
  
  .arrow-right {
    transform: rotate(-45deg);
  }
  
  .arrow-left {
    transform: rotate(135deg);
  }
  </style>
  