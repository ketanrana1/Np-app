import mongoose from 'mongoose';

const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose;

const taskStatusSchema = new Schema({
  runStatusId: {   
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
  taskId:{
    type: String,
    ref: 'Task'
  },
  logs: [Object]
},
{timestamps: true} 
);    

export default mongoose.model('TaskStatus', taskStatusSchema);

