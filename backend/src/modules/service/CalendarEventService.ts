import { CalendarEventRepository } from "../repositories/CalendarEventRepository";
import { CustomError } from "../../shared/errors/CustomError";
interface IRequest {
  title: string;
  start: string;
  end: string;
  status: string;
  location: string;
  rcur: boolean;
  rspList: [];
}
interface IdRequest {
  id: string;
}

interface UpdateRequest extends IRequest {
  _id: string;
}

export class CalendarEventService {
  constructor(
    private CalendarEventRepository: CalendarEventRepository,
  ) {}

  async create(data: IRequest) {
    try {
      if (!data) throw new CustomError("Event Calendar not found", 400);

      const eventCalendar = await this.CalendarEventRepository.create(data);

      if (!eventCalendar) throw new CustomError("Internal server error", 400);

      return eventCalendar;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const eventsCalendar = await this.CalendarEventRepository.getAll();

      if (!eventsCalendar) {
        return [];
      }

      return eventsCalendar;
    } catch (err) {
      throw err;
    }
  }

  async getById({ id }: IdRequest) {
    try {
      if (!id) throw new CustomError("Id not found", 400);

      const eventCalendar = await this.CalendarEventRepository.getOne({_id: id})

      if (!eventCalendar) throw new CustomError("Event Calendar not exist", 400);

      return eventCalendar;
    } catch (err) {
      throw err;
    }
  }

  async updateById({_id, start, end, location, rcur, rspList, title}: UpdateRequest) {
    const eventCalendarUpdated: any = {
      _id,
      title,
      start,
      end,
      location,
      rcur,
      rspList
    }

    try {
      if (!_id) throw new CustomError("Event Calendar not found", 400);

      const eventCalendarExist = await this.CalendarEventRepository.getOne({_id});

      if (!eventCalendarExist) throw new CustomError("Internal server error", 400);

      for (const index in eventCalendarUpdated) {
        if (typeof eventCalendarUpdated[index] === "undefined") {
          delete eventCalendarUpdated[index];
        }
      }
      
      const eventCalendar = await this.CalendarEventRepository.update(eventCalendarUpdated);

      return eventCalendar;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }: IdRequest) {
    try {
      if (!id) throw new CustomError("Id not found", 400);

      const eventCalendarExist = await this.CalendarEventRepository.getOne({_id: id})

      if (!eventCalendarExist) throw new CustomError("Event Calendar not exist", 400);

      const deleteEventCalendar = await this.CalendarEventRepository.delete({
        _id: eventCalendarExist._id,
      })

      return deleteEventCalendar;
    } catch (err) {
      throw err;
    }
  }
}
