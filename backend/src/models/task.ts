import mongoose from 'mongoose';

const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const taskSchema = new Schema({
  taskId: {   
    type: String,
    default: uuidv4 
  },
  name: String, 
  description: String,
  taskTypeId:{
    type: String,
    ref: 'TaskType' 
  },
  taskTypeAttributes: Object
},
{timestamps: true}
);
  
export default mongoose.model('Task', taskSchema);