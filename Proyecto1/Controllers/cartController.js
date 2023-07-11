const fs = require('fs');

function getCartFromFile() {
  const data = fs.readFileSync('carrito.json');
  return JSON.parse(data);
}

function saveCartToFile(cart) {
  const data = JSON.stringify(cart, null, 2);
  fs.writeFileSync('carrito.json', data);
}

function createCart(req, res) {
  const { products } = req.body;

  const newId = generateUniqueId();

  const newCart = {
    id: newId,
    products: products || []
  };

  saveCartToFile(newCart);

  res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
}

function getCartProducts(req, res) {
  const cid = req.params.cid;
  const cart = getCartFromFile();
  if (cart.id === cid) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
}

function addProductToCart(req, res) {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = getCartFromFile();

  const existingProduct = cart.products.find((p) => p.product === pid);
  if (existingProduct) {

    existingProduct.quantity += 1;
  } else {

    cart.products.push({ product: pid, quantity: 1 });
  }

  saveCartToFile(cart);

  res.json({ message: 'Producto agregado al carrito exitosamente', cart });
}

module.exports = {
  createCart,
  getCartProducts,
  addProductToCart
};
