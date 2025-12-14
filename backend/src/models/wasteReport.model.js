import mongoose, { Schema } from 'mongoose';

const wasteReportSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['e-waste', 'medical-waste', 'harmful-waste', 'non-harmful-dry-waste', 'non-harmful-wet-waste', 'general'],
    default: 'general',
  },
  access: {
    type: [String],
    default: ['admin', 'collector'],
  },
  reason: {
    type: String,
    trim: true,
  },
  areacode: { // Now required
    type: String,
    required: true, 
  },
  sourceCode: { // Now optional
    type: String,
    required: false,
    index: true,
  },
  imagePath: { // Now optional
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'collected', 'departed'],
    default: 'scheduled',
  },
  collectionTime: {
    type: Date,
  },
  departureTime: {
    type: Date,
  },
}, { timestamps: true });

export const WasteReport = mongoose.model('WasteReport', wasteReportSchema);