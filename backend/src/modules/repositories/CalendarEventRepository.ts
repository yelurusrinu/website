import CalendarEventModel from "../entities/CalendarEvent";

interface ICreateCalendarEvent {
  title: string;
  start: string;
  end: string;
  status: string;
  location: string;
  rcur:boolean;
  rspList: [];
}

interface IGetOneCalendarEvent {
  _id: string
}

interface IUpdateCalendarEvent {
  _id: string;
  title: string;
  start: string;
  end: string;
  status: string;
  location: string;
  rcur:boolean;
  rspList: [];
}

interface IDeleteCalendarEvent {
  _id: string;
}

export class CalendarEventRepository {
  async create(data: ICreateCalendarEvent) {
    try {
      return await new CalendarEventModel(data).save();
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      return await CalendarEventModel.find({});
    } catch (err) {
      throw err;
    }
  }

  async getOne({ _id }: IGetOneCalendarEvent) {
    try {
      return await CalendarEventModel.findOne({_id});
    } catch (err) {
      throw err;
    }
  }

  async delete({_id: id}: IDeleteCalendarEvent) {
    try {
      return await CalendarEventModel.findByIdAndRemove({_id: id});
    } catch (err) {
      throw err;
    }
  }

  async update(data: IUpdateCalendarEvent) {
    try {
      return await CalendarEventModel.findOneAndUpdate({
        _id: data._id,
      }, {
        $set: data
      }, {
        new: true,
      })
    } catch (err) {
      throw err;
    }
  }
}
