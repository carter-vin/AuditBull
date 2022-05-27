// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notes, Vendors } = initSchema(schema);

export {
  Notes,
  Vendors
};