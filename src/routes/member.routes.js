import { Router } from "express";
import memberNotesRoutes from "./memberNotes.routes.js";
import memberController from "../controllers/member.controller.js";

const memberRoutes = Router();

memberRoutes.get('/all', memberController.get);

memberRoutes.patch('/changeClient/:memberId', memberController.patch)

memberRoutes.use('/notes', memberNotesRoutes)

memberRoutes.route('/:memberId')
  .put(memberController.put)
  .delete(memberController.delete);

memberRoutes.post('/', memberController.post);

export default memberRoutes;
