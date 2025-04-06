
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  manufactureDate: { type: Date, required: true },
  image: { type: String },
  imageBuffer: { type: Buffer },
  imageType: { type: String }
}, {
  timestamps: true
});

productSchema.virtual('imageSrc').get(function () {
  if (this.imageBuffer && this.imageType) {
    return `data:${this.imageType};base64,${this.imageBuffer.toString('base64')}`;
  }
  return null;
});

productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
