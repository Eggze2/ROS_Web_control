package com.example.ros_web_control.remotecontrol;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/control")
public class ControlController {

    @Autowired
    private ControlService controlService;

    // 启动视频流传输
    @GetMapping("/start-stream")
    public ResponseEntity<?> startVideoStream(@RequestParam String robotId) {
        return controlService.startVideoStream(robotId);
    }

    // 远程控制命令
    @PostMapping("/send-command")
    public ResponseEntity<?> sendControlCommand(@RequestBody ControlCommand command) {
        return controlService.sendControlCommand(command);
    }
}




