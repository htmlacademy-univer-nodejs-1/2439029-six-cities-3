import {DocumentType} from '@typegoose/typegoose';
import { CreateFacilitiesDto } from './dto/create-facilities.dto.js';
import { FacilitiesEntity } from './facilities.entity.js';

export interface FacilitiesService {
  create(dto: CreateFacilitiesDto): Promise<DocumentType<FacilitiesEntity>>;
  findByFacilityId(categoryId: string): Promise<DocumentType<FacilitiesEntity> | null>;
  findByFacilityName(categoryName: string): Promise<DocumentType<FacilitiesEntity> | null>;
  findByFacilityNameOrCreate(categoryName: string, dto: CreateFacilitiesDto): Promise<DocumentType<FacilitiesEntity>>;
}
