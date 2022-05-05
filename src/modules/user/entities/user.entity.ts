import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Media } from '@modules/media/entities/media.entity';
import { Post } from '@modules/post/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  username?: string;

  @Column('varchar', { nullable: false })
  password?: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: true })
  mediaId?: string;

  @OneToOne(() => Media, (media) => media.user, { nullable: true, eager: true })
  @JoinColumn()
  media?: Media;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @ManyToMany(() => User, (user) => user.likes, { primary: true })
  likes?: Post[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt?: Date;
}
