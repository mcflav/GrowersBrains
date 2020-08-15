const Product = require('./../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


//This creates a new product in the products collections
async function createProduct(prodName,prodPrice,prodDescription, prodBrand, prodCategory, prodSupplier, prodImages){
  try {
    const product = await newProduct(prodName,prodPrice,prodDescription, prodBrand, prodCategory, prodSupplier, prodImages);
    const result = await product.save();
    return result;
  } catch(err) {
    let message = "400";
    return message;
  }
   
}
createProduct();
//
//
////This function returns all the products items created in the database.
async function plantProducts(){
  try {
    const products = await getProducts();
    return products;
  } catch(err) {
    let code = "400";
    return code; 
  }   
}
plantProducts();

//This function returns products by name created in the database.
async function plantProductName(myName){
  try {
    const products = await verifyContainerHasData(myName);
       if (products !== 0) {
       const getProdByName = await getProductByName(myName);
       return getProdByName;
    } else if (products === 0) {
        let code = "400";
        return code;;
    }
  } catch(err) {
    let message = "400";
    return message;
  }   
}
plantProductName();

////This function deletes a product item by name from the database.
async function deleteProduct(name){
  const products = {};
  try {
    products = await removeProduct(name);
    return products;
  } catch(err) {
    let code = "400";
    return code; 
  }   
}

//Search mongodb for all products.
function getProducts() {
    return new Promise((resolve, reject) => {
        const products = Product
        .find()
        resolve(products);
    });    
}

//Verify product name being searched is in the database.
function verifyContainerHasData(name) {
    this.name = name;
    return new Promise((resolve, reject) => {
         const products = Product;
         const prodCount = products.find({name: this.name}).count();
         resolve(prodCount);
    });    
}

//If name is in database grab it.
function getProductByName(name) {
    this.name = name;
    return new Promise((resolve, reject) => {
         const products = Product
        .find({name: this.name});
        resolve(products);
    });    
}

//Create a new product item in the product container.
function newProduct(name,price,description, brand, category, supplier, images) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.brand = brand;
    this.category = category;
    this.supplier = supplier;
    this.images = images;
    
    return new Promise((resolve, reject) => {
    const product = new Product({
          name: this.name,
          price: this.price,
          description: this.description,
          brand:  this.brand,
          category: this.category,
          supplier: this.supplier,
          inages: this.images
    });
    
    //const result = await product.save();
          resolve(product);
    });
}

function removeProduct(name) {
    this.name = name;
    return new Promise((resolve, reject) => {
         const products = Product;
        products.remove({name: {$eq: this.name}}, true);
        resolve(products);
    });    
}


module.exports.plantProducts = plantProducts;
module.exports.plantProductName = plantProductName;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;

//exports.getAllProducts = catchAsync(async (req, res, next) => {
//  const products = await getProducts();
//  res.status(200).json({
//    status: 'success',
//    data: {
//      Product: products,
//    },
//  });
//  
//});



//const getAllProducts = catchAsync(async (req, res, next) => {
//  const products = await Product.find();
//  res.status(201).json({
//    status: 'success',
//    data: {
//      Product: products,
//    },
//  });
//  res.send(products);
//});


//}
  
  
  
  

//exports.createProduct = catchAsync(async (req, res, next) => {
//  const newProduct = await Product.create(req.body);
//  res.status(201).json({
//    status: 'success',
//    data: {
//      Product: newProduct,
//    },
//  });
//});
//
//exports.getProduct = catchAsync(async (req, res, next) => {
//  const product = await Product.findById(req.params.id);
//
//  if (!product) {
//    return next(new AppError('No Product found with that ID ', 404));
//  }
//
//  res.status(200).json({
//    status: 'success',
//    data: {
//      product,
//    },
//  });
//});
//
//exports.updateProduct = catchAsync(async (req, res, next) => {
//  const updatedProduct = await Product.findByIdAndUpdate(
//    { _id: req.params.id },
//    req.body,
//    { new: true, runValidators: true }
//  );
//  if (!updatedProduct) {
//    return next(new AppError('No Product found with that ID ', 404));
//  }
//
//  res.status(200).json({
//    message: 'success',
//    data: {
//      product: updatedProduct,
//    },
//  });
//});
//
//exports.deleteProduct = catchAsync(async (req, res, next) => {
//  const product = await Product.findByIdAndDelete(req.params.id);
//  if (!product) {
//    return next(new AppError('No Product found with that ID ', 404));
//  }
//  res.status(204).json({
//    status: 'success',
//    data: null,
//  });
//});
