import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Exercise } from '../entity/Exercise';

const exerciseRepository = AppDataSource.getRepository(Exercise);

export class ExerciseController {
  public async index(req: Request, res: Response) {
    const { userId } = req.params;

    const exercises = await exerciseRepository.find({
      where: { user: userId as unknown as User },
    });

    return res.json(exercises);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const exercice = await exerciseRepository.findOne({ where: { id } });

    return res.json(exercice);
  }

  public async create(req: Request, res: Response) {
    const { name, currentHeight, maxHeight, description, userId } = req.body;

    const exercise = new Exercise();

    exercise.name = name;
    exercise.description = description;
    exercise.currentHeight = currentHeight;
    exercise.maxHeight = maxHeight;
    exercise.user = userId;

    await exerciseRepository.save(exercise);

    return res.json(exercise);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, currentHeight, maxHeight } = req.body;

    const exercise = await exerciseRepository.findOne({
      where: { id },
      relations: ['exercices'],
    });

    if (!exercise) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    exercise.name = name;
    exercise.description = description;
    exercise.currentHeight = currentHeight;
    exercise.maxHeight = maxHeight;

    await exerciseRepository.save(exercise);

    return res.json(exercise);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const exercise = await exerciseRepository.findOne({ where: { id } });

    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    await exerciseRepository.delete(exercise);

    return res.json([]);
  }
}
