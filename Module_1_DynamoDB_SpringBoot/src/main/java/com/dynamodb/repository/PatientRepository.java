package com.dynamodb.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.dynamodb.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/*
 *  Author:     Ovezmyrat Arnazarov
 *  Semester:   Spring-2022
 *  Class Description:  This class is a repository for an entity Patient to perform CRUD operations on a DynamoDB table.
 *                      All query operations are done by auto wiring a DynamoDB mapper from DynamoDBConfiguration class.
 *                      Reading data can be carried out in two ways: getPatientById() reads by ID and getAllPatients() reads all data.
 */

@Repository
public class PatientRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Patient save(Patient patient) {
        dynamoDBMapper.save(patient);
        return patient;
    }

    public Patient getPatientById(String patientID) {
        return dynamoDBMapper.load(Patient.class, patientID);
    }

    public String delete(String patientID) {
        Patient patient = dynamoDBMapper.load(Patient.class, patientID);
        dynamoDBMapper.delete(patient);
        return "Patient record deleted!";
    }

    public String update(String patientID, Patient patient) {
        dynamoDBMapper.save(patient, new DynamoDBSaveExpression()
        .withExpectedEntry("patientID", new ExpectedAttributeValue(new AttributeValue().withS(patientID))));

        return patientID;
    }

    public List<Patient> getAllPatients() {
        DynamoDBScanExpression dynamoDBScanExpression = new DynamoDBScanExpression();
        return dynamoDBMapper.scan(Patient.class, dynamoDBScanExpression);
    }
}

