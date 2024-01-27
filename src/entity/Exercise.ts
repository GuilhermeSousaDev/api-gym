import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
  } from 'typeorm';
import { Workout } from './Workout';
import { User } from './User';
  
  @Entity()
  export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column()
    maxHeight: number;

    @Column()
    currentHeight: number;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.exercices)
    user: User;

    @ManyToMany(() => Workout, (workout) => workout.exercises)
    workouts: Workout[];
  
    @CreateDateColumn({ default: '() => NOW()' })
    created_at: Date;
  
    @UpdateDateColumn({ default: '() => NOW()' })
    updated_at: Date;
  }
  