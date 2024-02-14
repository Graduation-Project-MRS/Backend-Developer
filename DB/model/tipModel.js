import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tip = mongoose.model('Tip', tipSchema);

export default Tip;
