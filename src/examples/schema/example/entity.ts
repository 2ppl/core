import { Static, Type } from '@sinclair/typebox';
import { CrudSchema, CrudType } from '../../../crud';

export const entity = Type.Object({
  id: Type.String(),
  title: Type.String(),
  amount: Type.Number(),
  relationId: Type.Integer(),
  createdAt: Type.Integer(),
  updatedAt: Type.Integer(),
});

export const singleEntity = Type.Intersect([
  Type.Omit(entity, ['relationId']),
  Type.Object({
    relation: Type.Object({
      id: Type.String(),
      title: Type.String(),
    }),
  }),
]);

export const listedEntity = Type.Omit(singleEntity, [
  'createdAt',
  'updatedAt',
]);

export const createEntity = Type.Omit(entity, [
  'id',
  'createdAt',
  'updatedAt',
]);

export const updateEntity = Type.Partial(createEntity);

export const entityKey = Type.Pick(entity, ['id']);

export const crudSchema: CrudSchema = {
  singleEntity,
  listedEntity,
  createEntity,
  updateEntity,
  entityKey,
};

export type EntityCrudType = CrudType<
  Static<typeof singleEntity>,
  Static<typeof listedEntity>,
  Static<typeof createEntity>,
  Static<typeof updateEntity>,
  Static<typeof entityKey>
  >;
