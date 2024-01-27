import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Workout } from './Workout';
import { Exercise } from './Exercise';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Workout, workout => workout.user)
  workouts: Workout[];

  @OneToMany(() => Exercise, exercise => exercise.user)
  exercices: Exercise[];

  @CreateDateColumn({ default: '() => NOW()' })
  created_at: Date;

  @UpdateDateColumn({ default: '() => NOW()' })
  updated_at: Date;
}
