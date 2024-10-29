import {User} from './user.type.js';

export type CommentsType = {
    text: string;
    createdAt: Date;
    rating: 1 | 2 | 3 | 4 | 5;
    author: User;
}
