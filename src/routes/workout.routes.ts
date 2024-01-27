import { Router } from 'express';
import { WorkoutController } from '../controller/WorkoutController';

const workoutRoutes = Router();
const workoutController = new WorkoutController();

workoutRoutes.get('/', workoutController.index);
workoutRoutes.post('/', workoutController.create);
workoutRoutes.put('/:id', workoutController.update);
workoutRoutes.delete('/:id', workoutController.delete);
workoutRoutes.delete('/:id/:exerciseId', workoutController.deleteExercise);

export default workoutRoutes;
