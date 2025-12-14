import mongoose, { Schema } from 'mongoose';

const complaintSchema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  complaineeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'resolved', 'in-progress'],
    default: 'pending',
  },
}, { timestamps: true });

export const Complaint = mongoose.model('Complaint', complaintSchema);