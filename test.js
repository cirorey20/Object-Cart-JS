const faker = require('faker');
function generateProducts() {
  let products = [];
  for (var i = 1; i <= 3; i++) {
    const name = faker.commerce.productName();
    const price = faker.commerce.price(50, 900);

    products.push({
      id: i,
      name: name,
      price: price,
    });
  }
  return products;
}

const products = generateProducts();
var cart = [];

function add(product) {
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id) {
        return (cart[i].quantity = cart[i].quantity + 1);
      }
    }
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
    });
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
    });
  }
  //total();
}
function total() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    console.log('quantity', cart[i].quantity);
    total = cart[i].price * cart[i].quantity + total;
  }
  return `El total del carrito es de: $${total}`;
}
function remove(idRem) {
  if (!cart[idRem]) {
    return 'Este Id No esta en el carrito';
  } else {
    if (cart[idRem].quantity > 1) {
      //decrementar solo la cantidad del producto
      --cart[idRem].quantity;
    } else if (cart[idRem].quantity === 1) {
      //eliminar producto del carrito
      cart.splice(idRem, 1);
    }
    return `Producto ${idRem} eliminado del carrito`;
  }
}

add(products[0]);
add(products[1]);
add(products[1]); //Añado los dos productos
console.log(cart); // muestro el carrito actual
console.log(total()); // muestro total
remove(1); //Añado los dos productos
console.log(cart); // muestro el carrito actual
console.log(total()); // muestro total
