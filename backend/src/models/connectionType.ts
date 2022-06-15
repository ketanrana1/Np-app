import mongoose from 'mongoose';

const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const connectionTypeSchema = new Schema({

  ConnectionTypeId: {   
    type: String,
    default: uuidv4 
  },
  name: String, 
  attributes: [Object]
},
{timestamps: true}
);
  
export default mongoose.model('ConnectionType', connectionTypeSchema); 