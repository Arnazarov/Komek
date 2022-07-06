package com.dynamodb.controller;

import com.dynamodb.entity.Patient;
import com.dynamodb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/*
 *  Author:     Ovezmyrat Arnazarov
 *  Semester:   Spring-2022
 *  Class Description:  This class creates different Rest controller methods to implement methods from a PatientRepository class.
 *                      There are RestAPI's with corresponding paths for create, delete, update, get all and get by id queries.
 */

@RestController
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @PostMapping("/patient")
    public Patient savePatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @GetMapping("/patient/{id}")
    public Patient getPatient(@PathVariable("id") String patientID) {
        return patientRepository.getPatientById(patientID);
    }

    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return patientRepository.getAllPatients();
    }


    @DeleteMapping("/patient/{id}")
    public String deletePatient(@PathVariable("id") String patientID) {
        return patientRepository.delete(patientID);
    }

    @PutMapping("/patient/{id}")
    public String updatePatient(@PathVariable("id") String patientID, @RequestBody Patient patient) {
        return patientRepository.update(patientID, patient);
    }
}
