import { Response, Request } from "express";

export type Endpoint = (req: Request, res: Response) => any;
export type ExpressHandler = {
  get: Endpoint,
  post: Endpoint,
  put: Endpoint,
  delete: Endpoint,
  patch: Endpoint
};

