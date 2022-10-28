import { Router } from "express";
import clientController from "../controllers/client.controller.js";

const clientRoutes = Router();

clientRoutes.route('/:clientId')
  .put(clientController.put)
  .delete(clientController.delete);

clientRoutes.route('/')
  .get(clientController.get)
  .post(clientController.post);

export default clientRoutes;
