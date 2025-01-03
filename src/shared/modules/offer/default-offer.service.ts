import {inject, injectable} from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {OfferService} from './offer-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import {Component, SortType} from '../../types/index.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';

const MAX_PREMIUM_OFFERS_COUNT = 3;
const MAX_OFFERS_COUNT = 60;
@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(count: number | undefined): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? MAX_OFFERS_COUNT;
    return this.offerModel
      .find()
      .sort({date: SortType.Down})
      .populate('userId')
      .limit(limit)
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, isPremium: true})
      .sort({date: SortType.Down})
      .limit(MAX_PREMIUM_OFFERS_COUNT)
      .populate('userId')
      .exec();
  }

  incComment(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        countComments: 1,
      }}).exec();

  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async addImage(offerId: string, image: string): Promise<void> {
    await this.offerModel
      .updateOne({_id: offerId}, {$addToSet: {images: image}});
  }

  public async removeImage(offerId: string, image: string): Promise<void> {
    await this.offerModel
      .updateOne({_id: offerId}, {$pull: {images: image}});
  }

  public async updateRating(offerId: string, rating: number): Promise<void> {
    await this.offerModel
      .findByIdAndUpdate(offerId, {rating: rating}, {new: true})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
