import { Router } from "express";
import memberNotesController from "../controllers/notes.controller.js";

const memberNotesRoutes = Router();

memberNotesRoutes.route('/:memberId')
  .get(memberNotesController.get)
  .post(memberNotesController.post);

export default memberNotesRoutes;
