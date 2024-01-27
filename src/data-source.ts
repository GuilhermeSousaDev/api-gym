import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Workout } from './entity/Workout';
import { Exercise } from './entity/Exercise';

export const AppDataSource = new DataSource({
  type: 'postgres',
  username: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  synchronize: true,
  logging: false,
  entities: [User, Workout, Exercise],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => console.log('Conectado'))
  .catch((e) => console.log(e));
