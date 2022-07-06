import { Realm } from '@realm/react';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  This class contains Patients' schema for Realm DB
 *
 */

export class Patients {
  constructor({
    id = new Realm.BSON.ObjectID(),
    name,
    email,
    phone,
    birthdate,
    status,
    bloodPressure,
    heartrate,
    temperature,
    pulseOximetry,
    respiratoryRate,
    patientID,
  }) {
    this._id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.birthdate = birthdate;
    this.status = status;
    this.createdAt = new Date();
    this.bloodPressure = bloodPressure;
    this.heartrate = heartrate;
    this.temperature = temperature;
    this.pulseOximetry = pulseOximetry;
    this.respiratoryRate = respiratoryRate;
    this.patientID = patientID;
  }

  static schema = {
    name: 'Patients',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      email: 'string',
      phone: 'string',
      birthdate: 'string',
      status: { type: 'string', default: 'active' },
      patientID: {
        type: 'string',
        default: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx',
      },
      bloodPressure: { type: 'string', default: '90/60 mmHg' },
      heartrate: { type: 'string', default: '75 bpm' },
      pulseOximetry: { type: 'string', default: '96 %' },
      respiratoryRate: { type: 'string', default: '16 bpm' },
      temperature: { type: 'string', default: '98.6 degF' },
      createdAt: 'date',
    },
  };
}
