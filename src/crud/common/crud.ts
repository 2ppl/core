import { TSchema } from '@sinclair/typebox';

export type CrudSchema = {
  singleEntity: TSchema;
  listedEntity: TSchema;
  createEntity: TSchema;
  updateEntity: TSchema;
  entityKey: TSchema;
};

export type CrudType<
  S_E extends object,
  L_E extends object,
  C_E extends object,
  U_E extends object,
  K extends object,
  > = {
  singleEntity: S_E;
  listedEntity: L_E;
  createEntity: C_E;
  updateEntity: U_E;
  entityKey: K;
};

export type BaseCrudType = CrudType<object, object, object, object, object>;

export type AnyCrudType = CrudType<any, any, any, any, any>;
