import mongoose from 'mongoose';
const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const logSchema = new Schema({
        flowId: {   
            type: String,
            default: uuidv4 
        },
        task: String,
        startDate: String, 
        endDate: String,
        status: String,
    },
    {timestamps: true}
);
  
export default mongoose.model('Log', logSchema);