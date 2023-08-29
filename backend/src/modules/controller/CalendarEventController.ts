import { Request, Response } from "express";
import { CalendarEventRepository } from "../repositories/CalendarEventRepository";
import { CustomError } from "../../shared/errors/CustomError";
import { CalendarEventService } from "../service/CalendarEventService";

export class CalendarEventController {
  async create(request: Request, response: Response) {
    const { eventCalendar = null } = request.body;

    try {
      const repository = new CalendarEventRepository();
      const service = new CalendarEventService(repository);
      const eventCalendarData = await service.create(eventCalendar);

      return response.status(201).json(eventCalendarData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const repository = new CalendarEventRepository();
      const service = new CalendarEventService(repository);
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
      const repository = new CalendarEventRepository();
      const service = new CalendarEventService(repository);
      const eventCalendar = await service.getById({id: String(id)});

      return response.status(200).json(eventCalendar);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async update(request: Request, response: Response) {
    const { eventCalendar = null } = request.body;

    try {
      const repository = new CalendarEventRepository();
      const service = new CalendarEventService(repository);
      const eventCalendarData = await service.updateById(eventCalendar);

      return response.status(201).json(eventCalendarData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const repository = new CalendarEventRepository();
      const service = new CalendarEventService(repository);
      const eventCalendarData = await service.delete({id: String(id)});

      return response.status(201).json(eventCalendarData);
    } catch (err) {
      if (err instanceof CustomError) {
        response.status(err.status).json({ message: err.message });
      }
    }
  }
  
}