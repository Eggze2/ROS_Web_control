# rosweb运行步骤

## 1. 终端输入

```bash
catkin_make
source ./devel/setup.sh 
rosrun rosboard rosboard_node

roslaunch rosbridge_server rosbridge_websocket.launch
rosrun web_video_server web_video_server _port:=9000
```
With simulation car:
```bash
roslaunch urdf2gazebo carinroom.launch
roslaunch navigation SLAM-Move_base.launch
rosrun tf2_web_republisher tf2_web_republisher
```
With wpr simulation
```bash
roslaunch wpr_simulation wpb_stage_robocup.launch
roslaunch wpr_simulation wpb_demo_nav.launch
rosrun robot_pose_publisher robot_pose_publisher
```

## 2. 浏览器

```bash
cd rosweb
npm run serve
```

浏览器进入http://localhost:8080

## 3. 参考资料

`git clone https://github.com/EESC-LabRoM/rosweb.git`
