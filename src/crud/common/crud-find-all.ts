import { Static, TSchema, Type } from '@sinclair/typebox';

export const crudFindAllQuery = Type.Partial(
  Type.Object({
    limit: Type.Integer({ minimum: 0, maximum: 100 }),
    offset: Type.Integer({ minimum: 0 }),
    order: Type.Object({
      field: Type.String(),
      direction: Type.Union([
        Type.Literal('asc'),
        Type.Literal('desc'),
      ])
    }),
    filter: Type.Record(Type.String(), Type.Union([
      Type.String(),
      Type.Object({ equal: Type.String() }),
      Type.Object({ like: Type.String() }),
      Type.Object({ gte: Type.String() }),
      Type.Object({ lte: Type.String() }),
      Type.Object({ gt: Type.String() }),
      Type.Object({ lt: Type.String() }),
    ])),
  }),
);

export type CrudFindAllQuery = Static<typeof crudFindAllQuery>;

export type CrudFindAllResult<T extends object> = {
  list: Array<T>;
  total: number;
};

export function makeCrudFindAllResult<T extends TSchema>(item: T) {
  return Type.Object({
    list: Type.Array(item),
    total: Type.Number({ minimum: 0 }),
  });
}
