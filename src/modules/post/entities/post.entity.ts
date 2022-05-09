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
import { Media } from '../../media/entities/media.entity';
import { Tag } from '../../post/entities/tag.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => Tag, (tag) => tag.posts, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  tag?: Tag;

  @ManyToOne(() => User, (user) => user.posts, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToMany(() => User, (user) => user.likes, { primary: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'likes',
  })
  likes?: User[];

  @OneToOne(() => Media, (media) => media.post, { nullable: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  media?: Media;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
