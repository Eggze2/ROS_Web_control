<template>
  <div class="joy-control">
    <div class="gamepad">
      <!-- Xbox Button Layout -->
      <div class="dpad">
        <div class="button" :class="{ pressed: gamepadButtons[14]?.pressed }">←</div>
        <div class="button" :class="{ pressed: gamepadButtons[13]?.pressed }">↓</div>
        <div class="button" :class="{ pressed: gamepadButtons[15]?.pressed }">→</div>
        <div class="button" :class="{ pressed: gamepadButtons[12]?.pressed }">↑</div>
      </div>
      <div class="face-buttons">
        <div class="button" :class="{ pressed: gamepadButtons[0]?.pressed }">A</div>
        <div class="button" :class="{ pressed: gamepadButtons[1]?.pressed }">B</div>
        <div class="button" :class="{ pressed: gamepadButtons[2]?.pressed }">X</div>
        <div class="button" :class="{ pressed: gamepadButtons[3]?.pressed }">Y</div>
      </div>
      <div class="shoulder-buttons">
        <div class="button" :class="{ pressed: gamepadButtons[4]?.pressed }">LB</div>
        <div class="button" :class="{ pressed: gamepadButtons[5]?.pressed }">RB</div>
      </div>
      <div class="triggers">
        <div class="button" :class="{ pressed: gamepadButtons[6]?.pressed }">LT</div>
        <div class="button" :class="{ pressed: gamepadButtons[7]?.pressed }">RT</div>
      </div>
      <div class="joysticks">
        <canvas ref="leftJoystick" width="100" height="100"></canvas>
        <canvas ref="rightJoystick" width="100" height="100"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoyControl',
  data() {
    return {
      gamepadIndex: null,
      gamepadButtons: [],
      gamepadAxes: [],
      ros: null,
      cmdVel: null,
    };
  },
  mounted() {
    window.addEventListener("gamepadconnected", this.connectHandler);
    window.addEventListener("gamepaddisconnected", this.disconnectHandler);
    this.poll();
    this.initROS();
  },
  methods: {
    initROS() {
      this.ros = new window.ROSLIB.Ros({
        url: 'ws://localhost:9090'
      });

      this.cmdVel = new window.ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist'
      });
    },
    connectHandler(event) {
      this.gamepadIndex = event.gamepad.index;
      this.updateGamepadState();
    },
    disconnectHandler() {
      this.gamepadIndex = null;
    },
    poll() {
      if (this.gamepadIndex !== null) {
        this.updateGamepadState();
      }
      requestAnimationFrame(this.poll);
    },
    updateGamepadState() {
      const gamepad = navigator.getGamepads()[this.gamepadIndex];
      if (gamepad) {
        this.gamepadButtons = gamepad.buttons.map((button, index) => ({
          index,
          pressed: button.pressed,
          value: button.value,
        }));
        this.gamepadAxes = gamepad.axes.slice();
        this.handleJoystickInput();
      }
    },
    handleJoystickInput() {
      const leftX = this.gamepadAxes[2];
      const leftY = this.gamepadAxes[1];

      let twist = new window.ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: 0 }
      });

      twist.linear.x = -leftY * 0.7; // Adjust speed as needed
      twist.angular.z = -leftX * 0.8; // Adjust turning speed as needed

      this.cmdVel.publish(twist);
    },
    updateJoysticks() {
      const leftCanvas = this.$refs.leftJoystick;
      const rightCanvas = this.$refs.rightJoystick;

      if (!leftCanvas || !rightCanvas) return;

      const leftCtx = leftCanvas.getContext('2d');
      const rightCtx = rightCanvas.getContext('2d');

      if (!leftCtx || !rightCtx) return;

      leftCtx.clearRect(0, 0, leftCanvas.width, leftCanvas.height);
      rightCtx.clearRect(0, 0, rightCanvas.width, rightCanvas.height);

      const drawJoystick = (ctx, x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        ctx.fillStyle = 'red';
        ctx.fill();
      };

      const size = 50;
      const leftX = this.gamepadAxes[0] * size + size;
      const leftY = this.gamepadAxes[1] * size + size;
      const rightX = this.gamepadAxes[2] * size + size;
      const rightY = this.gamepadAxes[3] * size + size;

      drawJoystick(leftCtx, leftX, leftY);
      drawJoystick(rightCtx, rightX, rightY);
    }
  }
};
</script>

<style scoped>
.joy-control {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gamepad {
  display: grid;
  grid-template-areas:
    "dpad face-buttons"
    "joysticks shoulder-buttons"
    "joysticks triggers";
  gap: 10px;
}

.dpad, .face-buttons, .shoulder-buttons, .triggers, .joysticks {
  display: flex;
  flex-wrap: wrap;
}

.button {
  width: 50px;
  height: 50px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.button.pressed {
  background-color: red;
}

.joysticks {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

canvas {
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>
