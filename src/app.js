import bodyParser from "body-parser";
import 'express-async-errors';
import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import accessControlMiddleware from "./middlewares/accessControl.middleware.js";
import clientRoutes from "./routes/client.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { nodeEnvs } from "./utils/nodeEnvs.js";
import validateJWTMiddleware from "./middlewares/validateJWT.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === nodeEnvs.dev) {
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Authorization, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    next();
  });
}

app.use('/auth', authRoutes);
app.use('/client', validateJWTMiddleware, accessControlMiddleware, clientRoutes);
app.use(errorHandlerMiddleware);

export default app;