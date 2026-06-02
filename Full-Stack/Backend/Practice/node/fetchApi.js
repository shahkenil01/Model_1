const products = require('../json/product.json');
// console.log(products[0].name);
// console.log(products[0].price);

fetch('https://dummyjson.com/products')
  .then(response => response.json())
  .then(data => {
    console.log(data.products[1].title);
  })
  .catch(error => {
    console.log(error);
  });