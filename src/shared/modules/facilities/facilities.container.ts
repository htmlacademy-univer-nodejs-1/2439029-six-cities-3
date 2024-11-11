import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { FacilitiesService } from './facilities-service.interface.js';
import { DefaultCategoryService } from './default-facilities.service.js';
import {FacilitiesEntity, FacilitiesModel} from './facilities.entity.js';

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<FacilitiesService>(Component.FacilitiesService).to(DefaultCategoryService);
  categoryContainer.bind<types.ModelType<FacilitiesEntity>>(Component.FacilitiesModel).toConstantValue(FacilitiesModel);

  return categoryContainer;
}
