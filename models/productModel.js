const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/growersBrains')
     .then(() => console.log('Connected to MongoDB..'))
     .catch(err => console.error('Could not connect to MongoDB..',err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  brand: {
    type: String,
    required: [true, 'A product must have a brand'],
  },
  category: {
    type: String,
    required: [true, 'A product must belong to a category'],
  },
  supplier: {
    type: String,
    required: [true, 'A product must have a supplier'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
