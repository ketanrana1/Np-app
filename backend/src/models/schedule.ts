import mongoose from 'mongoose';

const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  flowId: {
    type: String,
    default: uuidv4
  },
  name: String,
  description: String,
  flow: String,
  cronPattern: String,
  activeFlag: Boolean,
  success_Email: String,
  error_Email: String,
},
  { timestamps: true }
);

export default mongoose.model('schedule', scheduleSchema);