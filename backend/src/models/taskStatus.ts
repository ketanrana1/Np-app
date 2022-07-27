import mongoose from 'mongoose';

const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose;

const taskStatusSchema = new Schema({
  taskStatusId: {   
    type: String,
    default: uuidv4 
  },
  startTime: String, 
  endTime: String,
  ranAt: String,
  flowName: String,
  status: String,
  flowId:{
    type: String,
    ref: 'Flow'
  },
  actions: [Object],
  taskLog: String,
  taskName: String,
},
{timestamps: true}  
);    

export default mongoose.model('TaskStatus', taskStatusSchema);

