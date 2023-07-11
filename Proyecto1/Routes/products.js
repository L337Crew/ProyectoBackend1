const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Ruta raíz GET /api/products
router.get('/', productsController.getAllProducts);

// Ruta GET /api/products/:pid
router.get('/:pid', productsController.getProductById);

// Ruta raíz POST /api/products
router.post('/', productsController.addProduct);

// Ruta PUT /api/products/:pid
router.put('/:pid', productsController.updateProduct);

// Ruta DELETE /api/products/:pid
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
