import mongoose from 'mongoose';
const { v4 : uuidv4 } = require('uuid')
const { Schema } = mongoose;

const userSchema = new Schema({

        userId: {   
            type: String,
            default: uuidv4 
        },
        firebaseUserId: String,
        task: String,
        startDate: String, 
        endDate: String,
        status: String,
    },
    {timestamps: true}
 );
  
export default mongoose.model('User', userSchema);