const express = require('express');
const router = express.Router();
const model = require('./../models/productModel');
const allProducts = require('./../controllers/productController');
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('./../controllers/productController');


//get All Plant Products.
router.get('/', async (req, res) => {
  const products =  await allProducts.plantProducts();
  setTimeout(() => {
        if (products === "400") {
            res.status("400").send("Error querying database");
        }else{
            res.status("200").send(products);
        }
  }, 1000);
       
});

//Get Product By Name.
router.get('/:name', async (req, res) => {
  const products = await allProducts.plantProductName(req.params.name);
   setTimeout(() => {
       if (products === "400") {
           res.status("400").send("This product name does not exist in the products container.");
       }else{
           res.status("200").send(products); 
       }
   }, 1000);
});


//Add new product to the plants collections.
router.post('/', async (req, res) => {
    const addProduct = await createProduct(req.body.name, req.body.price, req.body.description, req.body.brand, req.body.category, req.body.supplier, req.body.images);
    setTimeout(() => {
          if (addProduct === "400") {
            res.status("400").send(addProduct);
          }else{
            res.status("200").send(addProduct);
          }
    }, 1000);
});       
    


//Update an item in the product collection.
router.put('/:id', async (req,res) =>{
      
    //Use Joi for (validation?
    const {error} = validateProduct(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
    product.name = req.body.name;
    res.send(product);
    
});

//Delete a product item from the product collections.
router.delete('/:name', async (req, res) => {
    let products =  await allProducts.deleteProduct(req.params.name);
    setTimeout(() => {
        res.json(products);
    }, 1000);
});
module.exports = router;
