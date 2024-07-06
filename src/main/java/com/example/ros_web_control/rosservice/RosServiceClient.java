package com.example.ros_web_control.rosservice;

import org.ros.Ros;
import org.ros.exception.RosException;
import org.ros.node.service.ServiceClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import custom_msgs.ControlCommandRequest;
import custom_msgs.ControlCommandResponse;
import std_srvs.TriggerRequest;
import std_srvs.TriggerResponse;

import java.util.Arrays;

public class RosServiceClient {
    // 连接ROS Master
    private Ros ros;

    public RosServiceClient() {
        // 假设初始化ROS连接
        ros = new Ros("ws://localhost:9090"); // ROS Bridge WebSocket地址
        ros.connect();
    }

    // 启动视频流服务
    public boolean startVideoStream(String robotId) {
        // 创建服务客户端
        ServiceClient<std_srvs.TriggerRequest, std_srvs.TriggerResponse> client = new ServiceClient<>(ros, "/start_video_stream", std_srvs.Trigger._TYPE);

        // 构建请求
        std_srvs.TriggerRequest request = client.newMessage();
        // 根据需要设置请求参数

        // 调用服务并获取响应
        try {
            std_srvs.TriggerResponse response = client.call(request);
            return response.getSuccess();
        } catch (RosException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 发送控制命令服务
    public boolean sendControlCommand(ControlCommand command) {
        // 创建服务客户端
        ServiceClient<custom_msgs.ControlCommandRequest, custom_msgs.ControlCommandResponse> client = new ServiceClient<>(ros, "/send_control_command", custom_msgs.ControlCommand._TYPE);

        // 构建请求
        custom_msgs.ControlCommandRequest request = client.newMessage();
        request.setRobotId(command.getRobotId());
        request.setCommand(command.getCommand());
        request.setParameters(Arrays.asList(command.getParameters()));

        // 调用服务并获取响应
        try {
            custom_msgs.ControlCommandResponse response = client.call(request);
            return response.getSuccess();
        } catch (RosException e) {
            e.printStackTrace();
            return false;
        }
    }
}

