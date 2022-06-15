import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { ConnectionController } from "./controllers"
import './database/mongoose';
import bodyParser from 'body-parser'; 
import { PORT } from "constants/environment"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, 
  {
    cors: true,
    controllers: [ConnectionController],
  }
)

app.listen(PORT, () => console.log("App running on PORT", PORT));