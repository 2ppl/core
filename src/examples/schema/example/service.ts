import { ApiConfig } from '../../../api';
import { CrudAxiosService, CrudService } from '../../../crud';
import { EntityCrudType, listedEntity, singleEntity } from './entity';

export interface EntityService extends CrudService<EntityCrudType> {
  superUpdate: (
    data: EntityCrudType['updateEntity'],
    params: EntityCrudType['entityKey'],
  ) => Promise<EntityCrudType['singleEntity']>;

  superCreate: (
    data: EntityCrudType['createEntity'],
  ) => Promise<EntityCrudType['singleEntity']>;
}

export const entityApiConfig: ApiConfig<EntityService, CrudService<EntityCrudType>> = {
  superUpdate: {
    method: 'PUT',
    url: '/:id/super-update',
  },
  superCreate: {
    method: 'POST',
    url: '/super-create',
  },
};

export class EntityCrudAxiosService extends CrudAxiosService<EntityCrudType> implements EntityService {
  protected singleEntity = singleEntity;

  protected listedEntity = listedEntity;

  async superUpdate(
    data: EntityCrudType['updateEntity'],
    params: EntityCrudType['entityKey'],
  ): Promise<EntityCrudType['singleEntity']> {
    return this.request({
      ...entityApiConfig.superUpdate,
      params,
      data,
    }, this.validateSingleEntity);
  }

  async superCreate(data: EntityCrudType['createEntity']): Promise<EntityCrudType['singleEntity']> {
    return this.request({
      ...entityApiConfig.superCreate,
      data,
    }, this.validateSingleEntity);
  }
}
