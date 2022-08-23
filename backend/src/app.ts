import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import {
  ConnectionController,
  TaskController,
  FlowController,
  ScheduleController,
  TaskTypeController,
  RunStatusController
} from "./controllers"
import './database/mongoose';
import bodyParser from 'body-parser';
import { PORT } from "constants/environment"
import cors from "cors";
import serveIndex from 'serve-index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/file-explorer', express.static('public'), serveIndex('public', { 'icons': true }))
app.use(cors())
useExpressServer(app,
  {
    cors: true,
    controllers: [ConnectionController, TaskController, FlowController, ScheduleController, TaskTypeController, RunStatusController],
  }
)

app.listen(PORT, () => console.log("App running on PORT", PORT));