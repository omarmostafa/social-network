import { Media } from '@modules/media/entities/media.entity';
import { Tag } from '@modules/post/entities/tag.entity';
import { User } from '@modules/user/entities/user.entity';

export interface PostDto {
  id: string;
  content: string;
  mediaId?: string;
  tagId?: string;
  tag?: Tag;
  likes?: User[];
  user?: User;
  userId?: string;
  media?: Media;
  numberOfLikes: number;
  createdAt: Date;
  updatedAt?: Date;
}
