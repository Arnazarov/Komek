package com.dynamodb.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
 *  Author:     Ovezmyrat Arnazarov
 *  Semester:   Spring-2022
 *  Class Description:  This class configures an Amazon DynamoDB client with appropriate credentials
 *                      and creates a mapper for DynamoDB database on cloud and return it as a bean for auto wiring within the project.
*/

@Configuration
public class DynamoDBConfiguration {


    // Dotenv library loads an .env file with AWS credentials in the assets folder
    Dotenv dotenv = Dotenv.configure()
            .directory("src/main/resources/assets")
            .load();

    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());
    }

    private AmazonDynamoDB buildAmazonDynamoDB() {
        return AmazonDynamoDBClientBuilder.standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(
                                dotenv.get("SERVICE_ENDPOINT"),
                                dotenv.get("SIGNING_REGION")
                        )
                )
                .withCredentials(
                        new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(
                                        dotenv.get("ACCESS_KEY"),
                                        dotenv.get("SECRET_KEY")
                                )
                        )
                )
                .build();
    }
}
