import {User} from './user.type.js';

export type CommentsType = {
    text: string;
    publicationDate: Date;
    rating: number;
    author: User;
}
