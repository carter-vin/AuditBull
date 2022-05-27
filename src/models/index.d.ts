import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NotesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VendorsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Notes {
  readonly id: string;
  readonly creator: string;
  readonly note: string;
  readonly taged: string[];
  readonly vendorsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notes, NotesMetaData>);
  static copyOf(source: Notes, mutator: (draft: MutableModel<Notes, NotesMetaData>) => MutableModel<Notes, NotesMetaData> | void): Notes;
}

export declare class Vendors {
  readonly id: string;
  readonly name?: string | null;
  readonly Notes?: (Notes | null)[] | null;
  readonly status: string;
  readonly service?: string | null;
  readonly website?: string | null;
  readonly compliance?: string | null;
  readonly finance?: string | null;
  readonly use_cases?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Vendors, VendorsMetaData>);
  static copyOf(source: Vendors, mutator: (draft: MutableModel<Vendors, VendorsMetaData>) => MutableModel<Vendors, VendorsMetaData> | void): Vendors;
}