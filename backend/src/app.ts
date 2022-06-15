// require("dotenv").config();
import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { getMetadataArgsStorage, useExpressServer, createExpressServer } from 'routing-controllers';
import { TestController } from './controllers/TestController';
import { ConnectionController } from 'controllers/ConnectionController';
import './database/mongoose';
import path from "path"

import cors from "cors";
import bodyParser from 'body-parser'; 

const { json, urlencoded } = bodyParser

const app = express();



app.use(json());
app.use(urlencoded({ extended: true }));

useExpressServer(app, 
  {
    cors: true,
    controllers: [TestController, ConnectionController],
  }
)

app.listen(5000, () => console.log("App running on PORT", 4000));