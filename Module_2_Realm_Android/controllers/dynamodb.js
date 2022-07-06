import axios from 'axios';
import { AWS_ENDPOINT } from '@env';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  This class contains methods to perform CRUD operations on AWS DynamoDB
 *
 */

/*
 *  Description:   Fetch/Read Patients' data from DynamoDB
 *  Inputs:   No inputs required
 *  Output:   Patients' data from DynamoDB in array[] format
 *  Usage:    This method is called in Home, Add and Edit component classes
 */
const fetchAllPatientsDynamoDB = async () => {
  try {
    const { data } = await axios.get(`http://${AWS_ENDPOINT}/patients`);
    return data;
  } catch (error) {
    console.log('AWS: ' + error.message);
  }
};

/*
 *  Description:   Adds a single Patient to DynamoDB
 *  Inputs:   Patient info object{} is required as input
 *  Output:   Outputs a patient id of a newyly created patient in String format
 *  Usage:    This method is called in Add component class
 */
const addPatientDynamoDB = async (patientInfo) => {
  const newData = {
    name: patientInfo.name,
    birthdate: patientInfo.birthdate,
    email: patientInfo.email,
    phone: patientInfo.phone,
    status: 'active',
    vitals: {
      temperature: patientInfo.temperature || '90.0 degF',
      heartRate: patientInfo.heartrate || '66 bpm',
      bloodPressure: patientInfo.bloodPressure || '88/70 mmHg',
    },
  };
  const { data } = await axios.post(`http://${AWS_ENDPOINT}/patient`, newData);
  return data.patientID;
};

/*
 *  Description:   Updates a single Patient in DynamoDB
 *  Inputs:   Updated patient info object{} is required as input
 *  Output:   Outputs a data of an updated patient in object{} format
 *  Usage:    This method is called in Edit component class
 */
const updatePatientDynamoDB = async (editedPatient) => {
  const newData = {
    patientID: editedPatient.patientID,
    name: editedPatient.patientName,
    birthdate: editedPatient.patientBirthdate,
    email: editedPatient.patientEmail,
    phone: editedPatient.patientPhone,
    status: 'active',
    vitals: {
      temperature: editedPatient.patientTemperature || '90.0 degF',
      heartRate: editedPatient.patientHeartRate || '66 bpm',
      bloodPressure: editedPatient.patientBloodPressure || '88/70 mmHg',
    },
  };
  const { data } = await axios.put(
    `http://${AWS_ENDPOINT}/patient/${editedPatient?.patientID}`,
    newData
  );

  return data;
};

/*
 *  Description:   Deletes a single Patient in DynamoDB
 *  Inputs:   Patient info object{} is required as input
 *  Output:
 *  Usage:    This method is called in Edit component class
 */
const deletePatientDynamoDB = async (patient) => {
  await axios.delete(`http://${AWS_ENDPOINT}/patient/${patient?.patientID}`);
};

export {
  fetchAllPatientsDynamoDB,
  addPatientDynamoDB,
  updatePatientDynamoDB,
  deletePatientDynamoDB,
};
