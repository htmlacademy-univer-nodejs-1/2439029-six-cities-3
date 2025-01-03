import {Component, SortType} from '../../types/index.js';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferService} from '../offer/index.js';
import {CommentService} from './comment-service.interface.js';

const COMMENTS_COUNT = 50;
@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
  }

  public async createForOffer(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    const offerId = dto.offerId;
    await this.offerService.incComment(offerId);

    const offer = await this.offerService.findById(offerId);

    const count = offer?.countComments ?? 1;
    const rating = offer?.rating ?? 0;
    const newRating = (rating + dto.rating) / count;
    await this.offerService.updateRating(offerId, newRating);
    return comment;
  }


  public findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel
      .findById(commentId)
      .populate('userId')
      .exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({publicationDate: SortType.Down})
      .populate('userId')
      .limit(COMMENTS_COUNT)
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
