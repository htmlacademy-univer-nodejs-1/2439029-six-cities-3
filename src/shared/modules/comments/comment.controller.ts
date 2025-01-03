import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../controller/index.js';
import {Component, HttpMethod, ParamsOffer} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {OfferService} from '../offer/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {DocumentExistsMiddleware, PrivateRouteMiddleware, ValidateDtoMiddleware} from '../../libs/middleware/index.js';
import {fillDTO} from '../../helpers/index.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {CommentRdo} from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.Config) configService: Config<RestSchema>
  ) {
    super(logger, configService);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index({params}: Request<ParamsOffer>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({body, params, user}: Request<ParamsOffer>, res: Response): Promise<void> {
    const comment = await this.commentService.createForOffer(
      {
        ...body, offerId:
        params.offerId,
        userId: user.id
      }
    );
    const result = await this.commentService.findById(comment.id);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
