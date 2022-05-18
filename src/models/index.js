// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const VendorStatusEnum = {
  "SEEKINGAPPROVAL": "SEEKINGAPPROVAL",
  "BUDGETAPPROVED": "BUDGETAPPROVED",
  "ACTIVE": "ACTIVE",
  "EVALUATION": "EVALUATION"
};

const { Notes, Vendors } = initSchema(schema);

export {
  Notes,
  Vendors,
  VendorStatusEnum
};