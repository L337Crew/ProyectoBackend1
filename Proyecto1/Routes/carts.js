const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Ruta raíz POST /api/carts
router.post('/', cartsController.createCart);

// Ruta GET /api/carts/:cid
router.get('/:cid', cartsController.getCartProducts);

// Ruta POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
