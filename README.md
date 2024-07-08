# rosweb运行步骤

## 1. 终端输入

```bash
catkin_make
source ./devel/setup.sh 
rosrun rosboard rosboard_node

roslaunch rosbridge_server rosbridge_websocket.launch
rosrun web_video_server web_video_server _port:=9000

roslaunch wpr_simulation wpb_demo_nav.launch(optional)
roslaunch wpr_simulation wpb_stage_robocup.launch(optional)
```
<<<<<<< HEAD
=======
With simulation car:
```bash
roslaunch urdf2gazebo carinroom.launch
roslaunch navigation SLAM-Move_base.launch
rosrun tf2_web_republisher tf2_web_republisher
```
>>>>>>> origin/simulation

## 2. 浏览器

```bash
cd rosweb
npm run serve
```

浏览器进入http://localhost:8080

## 3. 参考资料

原视频地址
https://www.bilibili.com/video/BV1Fj421975o/?spm_id_from=333.788&vd_source=32994245d17bef06ae1685daa70d431c

仓库

`git clone https://github.com/6-robot/wpr_simulation.git`

`git clone https://github.com/EESC-LabRoM/rosweb.git`
