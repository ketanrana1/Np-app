import mongoose from 'mongoose';

const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose;

const flowSchema = new Schema({
  flowId: {
    type: String,
    default: uuidv4
  },
  name: String,
  description: String,
  tasksName: String,
  ranAt: String,
  endTime: String,
  startTime: String,
  staus: String
},
  { timestamps: true }
);

export default mongoose.model('Flow', flowSchema);