import mongoose from 'mongoose';
import { MONGO_URI } from "constants/environment"

//@ts-ignore
mongoose.connect(MONGO_URI, () => console.log("Database Connected Successfully"));