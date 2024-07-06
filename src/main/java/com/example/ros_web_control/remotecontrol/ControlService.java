package com.example.ros_web_control.remotecontrol;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.ros_web_control.rosservice.RosServiceClient;
import org.slf4j.LoggerFactory;

@Service
public class ControlService {
    private static final Logger logger = LoggerFactory.getLogger(ControlService.class);

    @Autowired
    private RosServiceClient rosServiceClient;

    public ResponseEntity<?> startVideoStream(String robotId) {
        if (robotId == null || robotId.isEmpty()) {
            logger.error("Invalid robot ID: {}", robotId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Robot ID cannot be null or empty.");
        }

        boolean success = rosServiceClient.startVideoStream(robotId);
        if (success) {
            logger.info("Video stream started successfully for robot: {}", robotId);
            return ResponseEntity.ok("Video stream started successfully for robot: " + robotId);
        } else {
            logger.error("Failed to start video stream for robot: {}", robotId);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to start video stream for robot: " + robotId);
        }
    }

    public ResponseEntity<?> sendControlCommand(ControlCommand command) {
        if (command == null || command.getRobotId() == null || command.getRobotId().isEmpty() || command.getCommand() == null || command.getCommand().isEmpty()) {
            logger.error("Invalid control command: {}", command);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid control command.");
        }

        boolean success = rosServiceClient.sendControlCommand(command);
        if (success) {
            logger.info("Control command sent successfully for robot: {}", command.getRobotId());
            return ResponseEntity.ok("Control command sent successfully.");
        } else {
            logger.error("Failed to send control command for robot: {}", command.getRobotId());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send control command.");
        }
    }
}

