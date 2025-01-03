import {CreateCommentDto} from "./dto/create-comment.dto.js";
import {DocumentType} from "@typegoose/typegoose";
import {CommentEntity} from "./comment.entity.js";

export interface CommentService {
  createForOffer(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findById(commentId: string): Promise<DocumentType<CommentEntity> | null>
  deleteByOfferId(offerId: string): Promise<number | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>
}
