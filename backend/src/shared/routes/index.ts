import { Router } from "express";
import calendarRoutes from "./calendarRoutes";
import userRoutes from "./userRoutes";

const routes = Router();

routes.use("/api/bookings", calendarRoutes);
routes.use("/api/users", userRoutes);

export default routes;
