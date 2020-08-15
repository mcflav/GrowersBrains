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
  
//This is hardwired code to create a product in the database. I inserted about 15 records and then
//used the code below to query the items in the database.
//async function createProduct(){
//   const product = new Product({
//        name: 'Seed15',
//        price: 8.00,
//        description: 'Tomato Seeds',
//        brand:  'Scotts',
//        category: '1',
//        supplier: 'Scotts Warehouse',
//        inages: ['image1.png', 'image2.png', 'image3.png']
//    });
//   const result = await product.save();
//}
//createProduct();


module.exports = Product;
