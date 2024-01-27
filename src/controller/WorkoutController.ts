import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Workout } from '../entity/Workout';

const workoutRepository = AppDataSource.getRepository(Workout);

export class WorkoutController {
  public async index(req: Request, res: Response) {
    const { userId } = req.params;

    const workouts = await workoutRepository.find({
      where: { user: userId as unknown as User },
    });

    return res.json(workouts);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const workout = await workoutRepository.findOne({ where: { id } });

    return res.json(workout);
  }

  public async create(req: Request, res: Response) {
    const { week, userId } = req.body;

    const weekExists = await workoutRepository.findOne({ where: { week } });

    if (weekExists) {
      return res.status(400).json({ message: 'Week already exists' });
    }

    const workout = new Workout();

    workout.week = week;
    workout.exercises = [];
    workout.user = userId;

    await workoutRepository.save(workout);

    return res.json(workout);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { exercice } = req.body;

    const workout = await workoutRepository.findOne({
      where: { id },
      relations: ['exercices'],
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    workout.exercises.push(exercice);

    await workoutRepository.save(workout);

    return res.json(workout);
  }

  public async deleteExercise(req: Request, res: Response) {
    const { id, exerciceId } = req.params;

    const workout = await workoutRepository.findOne({
      where: { id },
      relations: ['exercices'],
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    workout.exercises = workout.exercises.filter(
      (exercice) => exercice.id !== exerciceId
    );

    await workoutRepository.save(workout);

    return res.json(workout);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const workout = await workoutRepository.findOne({ where: { id } });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    await workoutRepository.delete(workout);

    return res.json([]);
  }
}
