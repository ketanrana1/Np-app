import mongoose from 'mongoose';
const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const logSchema = new Schema({
        logId: {   
            type: String,
            default: uuidv4 
        },
        flowId:{
            type: String,
            ref: 'Flow'
        },
        taskName: String,
        startDate: String, 
        endDate: String,
        status: String,
        description: String,
        logDate: String
    },
    {timestamps: true}
);
  
export default mongoose.model('Log', logSchema);