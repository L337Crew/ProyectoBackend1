const fs = require('fs');

// Función para leer el archivo JSON del carrito
function getCartFromFile() {
  const data = fs.readFileSync('carrito.json');
  return JSON.parse(data);
}

// Función para escribir en el archivo JSON del carrito
function saveCartToFile(cart) {
  const data = JSON.stringify(cart, null, 2);
  fs.writeFileSync('carrito.json', data);
}

// Función para crear un nuevo carrito
function createCart(req, res) {
  const { products } = req.body;

  // Generar un nuevo ID único para el carrito
  const newId = generateUniqueId();

  // Crear el objeto del nuevo carrito
  const newCart = {
    id: newId,
    products: products || []
  };

  // Guardar el nuevo carrito en el archivo JSON
  saveCartToFile(newCart);

  res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
}

// Función para obtener los productos de un carrito por su ID
function getCartProducts(req, res) {
  const cid = req.params.cid;
  const cart = getCartFromFile();
  if (cart.id === cid) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
}

// Función para agregar un producto a un carrito
function addProductToCart(req, res) {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = getCartFromFile();

  // Verificar si el producto ya existe en el carrito
  const existingProduct = cart.products.find((p) => p.product === pid);
  if (existingProduct) {
    // Si el producto ya existe, incrementar la cantidad
    existingProduct.quantity += 1;
  } else {
    // Si el producto no existe, agregarlo alcarrito con una cantidad inicial de 1
    cart.products.push({ product: pid, quantity: 1 });
  }

  // Guardar el carrito actualizado en el archivo JSON
  saveCartToFile(cart);

  res.json({ message: 'Producto agregado al carrito exitosamente', cart });
}

module.exports = {
  createCart,
  getCartProducts,
  addProductToCart
};
