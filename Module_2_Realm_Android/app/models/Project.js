import { createRealmContext, Realm } from '@realm/react';
import { Patients } from './Patients';

/*
 *  Author:   Ovezmyrat Arnazarov
 *  Class Description:  This class creates a Realm context provider for Realm DB
 *
 */

export const { useRealm, useQuery, RealmProvider } = createRealmContext({
  schema: [Patients.schema],
  deleteRealmIfMigrationNeeded: true,
});
