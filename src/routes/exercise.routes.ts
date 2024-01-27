import { Router } from 'express';
import { ExerciseController } from '../controller/ExerciseController';

const exerciseRoutes = Router();
const exerciseController = new ExerciseController();

exerciseRoutes.get('/', exerciseController.index);
exerciseRoutes.post('/', exerciseController.create);
exerciseRoutes.put('/:id', exerciseController.update);
exerciseRoutes.delete('/:id', exerciseController.delete);

export default exerciseRoutes;
