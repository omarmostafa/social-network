import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from '@modules/post/entities/post.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToOne(() => User, (user) => user.media, { nullable: true })
  user?: User;

  @OneToOne(() => Post, (post) => post.media, { nullable: true })
  post?: Post;

  @DeleteDateColumn()
  deletedAt: Date;
}
