import { Router } from 'express';
import userRoutes from './routes/user.routes';
import exerciseRoutes from './routes/exercise.routes';
import workoutRoutes from './routes/workout.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/exercise', exerciseRoutes);
routes.use('/workout', workoutRoutes);

export default routes;
