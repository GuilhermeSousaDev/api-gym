import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { hash } from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  public async index(req: Request, res: Response) {
    const users = await userRepository.find();

    return res.json(users);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id } });

    return res.json(user);
  }

  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = await hash(password, 8);

    await userRepository.save(user);

    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return res.json(user);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRepository.delete(user);

    return res.json([]);
  }
}
