import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { CustomError } from "../../shared/errors/CustomError";
import { UserService } from "../service/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const { user = null } = request.body;

    try {
      const repository = new UserRepository();
      const service = new UserService(repository);
      const userData = await service.create(user);

      return response.status(201).json(userData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const repository = new UserRepository();
      const service = new UserService(repository);
      const eventsCalendar = await service.getAll();

      return response.status(200).json(eventsCalendar);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async get(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const repository = new UserRepository();
      const service = new UserService(repository);
      const user = await service.getById({id: String(id)});

      return response.status(200).json(user);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async update(request: Request, response: Response) {
    const { user = null } = request.body;

    try {
      const repository = new UserRepository();
      const service = new UserService(repository);
      const userData = await service.updateById(user);

      return response.status(201).json(userData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const repository = new UserRepository();
      const service = new UserService(repository);
      const userData = await service.delete({id: String(id)});

      return response.status(201).json(userData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
  
}