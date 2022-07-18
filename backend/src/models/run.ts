import mongoose from 'mongoose';
const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const runSchema = new Schema({
  flowId: {   
    type: String,
    default: uuidv4 
  },
  startDate: String, 
  endDate: String,
  status: String,
},
{timestamps: true}
);
  
export default mongoose.model('Run', runSchema);