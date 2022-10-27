import express from "express";
import { bootstrap } from "./bootstrap.js";

const app = express();

app.listen(3000, bootstrap);