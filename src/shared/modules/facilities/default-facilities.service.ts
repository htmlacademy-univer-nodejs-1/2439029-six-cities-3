import { FacilitiesService } from './facilities-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FacilitiesEntity } from './facilities.entity.js';
import { CreateFacilitiesDto } from './dto/create-facilities.dto.js';

export class DefaultFacilitiesService implements FacilitiesService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.FacilitiesModel) private readonly categoryModel: types.ModelType<FacilitiesEntity>
  ) {}

  public async create(dto: CreateFacilitiesDto): Promise<DocumentType<FacilitiesEntity>> {
    const result = await this.categoryModel.create(dto);
    this.logger.info(`New category created: ${dto.name}`);
    return result;
  }

  public async findByCategoryId(categoryId: string): Promise<DocumentType<FacilitiesEntity> | null> {
    return this.categoryModel.findById(categoryId).exec();
  }

  public async findByCategoryName(categoryName: string): Promise<DocumentType<FacilitiesEntity> | null> {
    return this.categoryModel.findOne({name: categoryName}).exec();
  }

  public async findByCategoryNameOrCreate(categoryName: string, dto: FacilitiesEntity): Promise<DocumentType<FacilitiesEntity>> {
    const existedCategory = await this.findByCategoryName(categoryName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }
}
