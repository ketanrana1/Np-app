import { any } from 'joi';
import mongoose from 'mongoose';
const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const runStatusSchema = new Schema({
  runStatusId: {   
    type: String,
    default: uuidv4 
  },
  startTime: Number, 
  endTime: Number,
  ranAt: Number,
  flowName: String
},
{timestamps: true}
);    
  
export default mongoose.model('RunStatus', runStatusSchema);