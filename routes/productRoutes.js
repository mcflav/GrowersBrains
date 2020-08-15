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
  //I couldn't get getAllProducts to see the plantProducts function so I used allProducts to import ProductController.
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
router.put('/:id', (req,res) =>{
      
    //Validate
    //If invalid, return 400
    const {error} = validateProduct(req.body);
    if (error) {
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }
    
    //Update course
    product.name = req.body.name;
    //Return the updated course
    res.send(product);
    
});

//Delete a product item from the product collections.
router.delete('/:name', async (req, res) => {
    const products =  await allProducts.deleteProduct(req.params.name);
    setTimeout(() => {
        if (products === "400") {
            res.status("400").send("Error deleting product from database");
        }else{
            res.status("200").send(products);
        }
  }, 1000);
});

//router.route('/').get(getAllProducts).post(createProduct);
//
//router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
