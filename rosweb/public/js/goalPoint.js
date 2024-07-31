RosCanvas.goalPoint = function(options) {
  var that = this;
  options = options || {};
  var size = options.size || 0.5;
  var strokeSize = options.strokeSize || 0.1;
  var strokeColor = options.strokeColor || '#000'; // 默认黑色边框
  var fillColor = options.fillColor || null; // 默认不填充纯色
  var gradientFillColor = options.gradientFillColor || ["#00c3ff", "#ffff1c"]; // 明亮的蓝黄渐变
  var pulse = options.pulse;

  // 创建图形
  var graphics = new createjs.Graphics();
  if (fillColor) {
    graphics.beginFill(fillColor); // 单色填充
  } else {
    // 渐变填充
    graphics.beginRadialGradientFill(gradientFillColor, [0, 1], 0, 0, 0, 0, 0, size);
  }
  if (strokeColor) {
    graphics.setStrokeStyle(strokeSize).beginStroke(strokeColor);  
  }
  graphics.drawCircle(0, 0, size); // 绘制圆形
  graphics.endFill();
  graphics.endStroke();

  // 创建形状
  createjs.Shape.call(this, graphics);

  // 阴影效果
  this.shadow = new createjs.Shadow("#666", 2, 2, 10);

  // 脉冲动画
  if (pulse) {
    var growCount = 0;
    var maxGrow = 20; // 最大放大步数
    var scaleAmount = 1.01; // 放大系数
    createjs.Ticker.addEventListener('tick', function() {
      that.scaleX = that.scaleY *= (growCount < maxGrow) ? scaleAmount : 1/scaleAmount;
      if (growCount >= maxGrow * 2) growCount = 0; // 重置计数
      growCount++;
    });
  }

  // 隐藏方法
  this.hide = function() {
    that.visible = false; // 设置为不可见
  };
};

// 继承自createjs.Shape
RosCanvas.goalPoint.prototype = Object.create(createjs.Shape.prototype);
RosCanvas.goalPoint.prototype.constructor = RosCanvas.goalPoint;
