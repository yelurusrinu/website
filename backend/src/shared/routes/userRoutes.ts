import { Router } from "express";
import { UserController } from "../../modules/controller/UserController";

const userRoutes = Router();

const userController = new UserController();
userRoutes.post("/", userController.create);
userRoutes.get("/", userController.getAll);
userRoutes.get("/:id", userController.get);
userRoutes.put("/", userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;
