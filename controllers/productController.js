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
  let products = {};
  try {
    let haveProduct = await verifyContainerHasData(name);
    if (haveProduct === 0) {
        return "this product is not in the product collection for deletion.";
    }else{
        products = await removeProduct(name);
        return products;
    }
  } catch(err) {
    let code = err.message;
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

//Get product by name.
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
    
          resolve(product);
    });
}


//Delete product item.
function removeProduct(name) {
    this.name = name;
    return new Promise((resolve, reject) => {
         let products = Product;
        //products.remove({name: {$eq: this.name}});
        let myquery = {name: this.name};
        products.deleteOne(myquery, function(err, obj) {
          if (err) throw err;
        });
        resolve("1 document deleted");
    });    
}


module.exports.plantProducts = plantProducts;
module.exports.plantProductName = plantProductName;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;