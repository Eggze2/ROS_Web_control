package com.example.ros_web_control;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class RosWebControlApplication {

	public static void main(String[] args) {
		SpringApplication.run(RosWebControlApplication.class, args);
	}

}
