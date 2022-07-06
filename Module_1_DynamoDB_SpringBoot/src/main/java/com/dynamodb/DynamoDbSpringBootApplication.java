package com.dynamodb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
 *  Author:     Ovezmyrat Arnazarov
 *  Semester:   Spring-2022
 *  Class Description:  Main class that starts the DynamoDB-SpringBoot Application.
 */

@SpringBootApplication
public class DynamoDbSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(DynamoDbSpringBootApplication.class, args);
	}

}
