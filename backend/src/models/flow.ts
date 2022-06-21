import mongoose from 'mongoose';

const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose;

const flowSchema = new Schema({
  flowId: {
    type: String,
    default: uuidv4
  },
  flowName: String,
  description: String,
  tasks: [Object],
  variableSel: [Object]
},
  { timestamps: true }
);

export default mongoose.model('Flow', flowSchema);