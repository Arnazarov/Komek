package com.dynamodb.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 *  Author:     Ovezmyrat Arnazarov
 *  Semester:   Spring-2022
 *  Class Description:  This class creates a Vitals entity as a "vitals" attribute for the DynamoDB table called "patients".
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBDocument
public class Vitals {

    @DynamoDBAttribute(attributeName="temperature")
    private String temperature;
    @DynamoDBAttribute(attributeName="heartRate")
    private String heartRate;
    @DynamoDBAttribute(attributeName="bloodPressure")
    private String bloodPressure;
}
