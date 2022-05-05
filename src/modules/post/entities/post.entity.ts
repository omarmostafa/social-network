import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '@modules/media/entities/media.entity';
import { Tag } from '@modules/post/entities/tag.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  content: string;

  @Column('varchar', { nullable: true })
  mediaId: string;

  @Column('varchar', { nullable: true })
  tagId: string;

  @Column('varchar', { nullable: true })
  userId: string;

  @Column({ default: 0 })
  numberOfLikes: number;

  @ManyToOne(() => Tag, (tag) => tag.posts, { nullable: true, eager: true })
  @JoinColumn({ name: 'tagId' })
  tag?: Tag;

  @ManyToOne(() => User, (user) => user.posts, { nullable: true, eager: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToMany(() => User, (user) => user.likes, { primary: true })
  @JoinTable({
    name: 'likes',
  })
  likes?: User[];

  @OneToOne(() => Media, (media) => media.post, { nullable: true, eager: true })
  @JoinColumn()
  media?: Media;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
