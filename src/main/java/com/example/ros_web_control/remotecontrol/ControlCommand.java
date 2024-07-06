package com.example.ros_web_control.remotecontrol;

public class ControlCommand {
    private String robotId;
    private String command;
    private String[] parameters;

    // Getters and setters
    public String getRobotId() {
        return robotId;
    }

    public void setRobotId(String robotId) {
        this.robotId = robotId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String[] getParameters() {
        return parameters;
    }

    public void setParameters(String[] parameters) {
        this.parameters = parameters;
    }
}

