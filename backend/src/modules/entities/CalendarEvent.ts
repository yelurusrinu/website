
import mongoose, { Document } from "mongoose";

const CalendarEventSchema = new mongoose.Schema<ICalendarEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    rcur: {
      type: Boolean,
      default: false,
      required: true,
    },
    rspList: [{ type: mongoose.SchemaTypes.ObjectId }],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "EventCalendar",
  }
);

export interface ICalendarEvent extends Document {
  title: string;
  start: Date;
  end: Date;
  status: string;
  location: string;
  rcur:boolean;
  rspList: [];
  createdAt: Date;
  updatedAt: Date;
}

const CalendarEventModel = mongoose.model("CalendarEvent", CalendarEventSchema);

export default CalendarEventModel;
