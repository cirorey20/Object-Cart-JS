// run `node index.js` in the terminal
const faker = require('faker');

function generateProducts() {
  let products = [];
  for (var i = 1; i <= 20; i++) {
    const name = faker.commerce.productName();
    const price = faker.commerce.price(50, 900);
    const description = faker.commerce.productDescription();

    products.push({
      id: i,
      name: name,
      price: price,
      description: description,
    });
  }
  return products;
}
const products = generateProducts();

class Cart {
  constructor() {
    this.products = [];
    //this.productsByQuantity = [];
    this.count = 0;
    this.total = 0;
  }

  add(product) {
    //this.products.push(product);

    if (this.products.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          ++this.products[i].quantity;
          return this.#total();
        }
      }
      this.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    } else {
      this.products.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
    this.count = this.products.length;
    this.#total();
  } //end add

  #total() {
    var total = 0;
    for (var i = 0; i < this.products.length; i++) {
      total = this.products[i].price * this.products[i].quantity + total;
    }
    this.total = total;
  } //end total

  remove(idRem) {
    if (!this.products[idRem]) {
      return 'Este Id No esta en el carrito';
    } else {
      if (this.products[idRem].quantity > 1) {
        //decrementar solo la cantidad del producto
        this.products[idRem].quantity--;
        this.#total();
      } else {
        //eliminar producto del carrito
        this.products.splice(idRem, 1);
        this.#total();
      }
      return `Producto ${idRem} eliminado del carrito`;
    }
  } //end remove

  clearCart() {
    this.products = [];
    this.productsByQuantity = [];
    this.count = 0;
    this.total = 0;
  }
} //end class Cart

//PROBANDO METODOS DEL CART
let cart = new Cart();

cart.add(products[1]);
cart.add(products[15]);
cart.add(products[15]);
cart.add(products[15]);

cart.remove(1); // es este caso le paso solo la posicion del carrito

console.log('Cart con Añadidos: ', cart.products);
//console.log('Posicion de producto: ', cart.products[0]);

//console.log(cart.clearCart());
//console.log('Cart con uno Eliminado: ', cart.products);

console.log(`Hay ${cart.count} productos en el carrito`);
console.log(`El total actual es de: $${cart.total}.00`);
//console.log(products);
