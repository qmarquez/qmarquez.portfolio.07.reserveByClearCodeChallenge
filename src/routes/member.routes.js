import { Router } from "express";
import memberController from "../controllers/member.controller.js";

const memberRoutes = Router();

memberRoutes.route('/:memberId')
  .put(memberController.put)
  .delete(memberController.delete);

memberRoutes.patch('/changeClient/:memberId', memberController.patch)

memberRoutes.get('/all', memberController.get);

memberRoutes.post('/', memberController.post);

export default memberRoutes;
