import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Exercise } from './Exercise';
import { User } from './User';

enum Weeks {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
}

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Weeks })
  week: string;

  @ManyToOne(() => User, (user) => user.workouts)
  user: User;

  @ManyToMany(() => Exercise, (exercise) => exercise.workouts)
  @JoinTable()
  exercises: Exercise[];

  @CreateDateColumn({ default: '() => NOW()' })
  created_at: Date;

  @UpdateDateColumn({ default: '() => NOW()' })
  updated_at: Date;
}
