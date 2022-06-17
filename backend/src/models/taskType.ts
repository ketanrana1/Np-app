import mongoose from 'mongoose';

const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const taskTypeSchema = new Schema({

  taskTypeId: {   
    type: String,
    default: uuidv4 
  },
  name: String, 
  attributes: [Object]
},
{timestamps: true}
);
  
export default mongoose.model('TaskType', taskTypeSchema); 