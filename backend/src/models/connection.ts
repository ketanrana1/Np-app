import mongoose from 'mongoose';

const {v4 : uuidv4} = require('uuid')
const { Schema } = mongoose;

const connectionSchema = new Schema({
  ConnectionId: {   
    type: String,
    default: uuidv4 
  },
  name: String, 
  description: String,
  connectionTypeId:{
    type: String,
    ref: 'ConnectionType' 
  },
  connectionTypeAttributes: [Object] 
},
{timestamps: true}
);
  
export default mongoose.model('Connection', connectionSchema);