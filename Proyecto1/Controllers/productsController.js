const fs = require('fs');

// Función para leer el archivo JSON de productos
function getProductsFromFile() {
  const data = fs.readFileSync('productos.json');
  return JSON.parse(data);
}

// Función para escribir en el archivo JSON de productos
function saveProductsToFile(products) {
  const data = JSON.stringify(products, null, 2);
  fs.writeFileSync('productos.json', data);
}

// Función para listar todos los productos
function getAllProducts(req, res) {
  const products = getProductsFromFile();
  res.json(products);
}

// Función para obtener un producto por su ID
function getProductById(req, res) {
  const pid = req.params.pid;
  const products = getProductsFromFile();
  const product = products.find((p) => p.id === pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

// Función para agregar un nuevo producto
function addProduct(req, res) {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  // Generar un nuevo ID único
  const newId = generateUniqueId();

  // Crear el objeto del nuevo producto
  const newProduct = {
    id: newId,
    title,
    description,
    code,
    price,
    status: status || true,
    stock,
    category,
    thumbnails
  };

  // Guardar el nuevo producto en el archivo JSON
  const products = getProductsFromFile();
  products.push(newProduct);
  saveProductsToFile(products);

  res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
}

// Función para actualizar un producto por su ID
function updateProduct(req, res) {
  const pid = req.params.pid;
  const updatedFields = req.body;

  const products = getProductsFromFile();
  const product = products.find((p) => p.id === pid);
  if (product) {
    // Actualizar los campos del producto
    Object.assign(product, updatedFields);
    saveProductsToFile(products);
    res.json({ message: 'Producto actualizado exitosamente', product });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

// Función para eliminar un producto por su ID
function deleteProduct(req, res) {
  const pid = req.params.pid;
  const products = getProductsFromFile();
  const productIndex = products.findIndex((p) => p.id === pid);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    saveProductsToFile(products);
    res.json({ message: 'Producto eliminado exitosamente' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
