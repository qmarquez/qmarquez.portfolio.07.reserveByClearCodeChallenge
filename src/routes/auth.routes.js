import { Router } from "express";
import signinController from "../controllers/signin.controller.js";
import signupController from "../controllers/signup.controller.js";

const authRoutes = Router();

authRoutes.post('/signin', signinController.post);
authRoutes.post('/signup', signupController.post);

export default authRoutes;
