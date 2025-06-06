const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number'],
    max: [1000000, 'Price cannot exceed 1,000,000']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Home', 'Books', 'Other'],
      message: 'Please select a valid category'
    }
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


productSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});


productSchema.pre('save', function(next) {
  if (this.price) {
    this.price = parseFloat(this.price.toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);