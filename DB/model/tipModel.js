import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 31
  },
  content: {
    type: String,
    required: true,
    min:10
  },
  userName: String ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;
