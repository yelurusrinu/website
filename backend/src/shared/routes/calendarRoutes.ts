import { Router } from "express";
import { CalendarEventController } from "../../modules/controller/CalendarEventController";

const calendarRoutes = Router();

const calendarEventController = new CalendarEventController();
calendarRoutes.post("/", calendarEventController.create);
calendarRoutes.get("/", calendarEventController.getAll);
calendarRoutes.get("/:id", calendarEventController.get);
calendarRoutes.put("/", calendarEventController.update);
calendarRoutes.delete("/:id", calendarEventController.delete);

export default calendarRoutes;
