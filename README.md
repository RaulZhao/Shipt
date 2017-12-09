# Shipt

### Server: Node.js

### DB: Mongo

### Restful API:
  http://localhost:8888/api/products
  http://localhost:8888/api/categories
  http://localhost:8888/api/orders
  http://localhost:8888/api/customers

### Others
  1. Implement auto_increment id for nosql database
  2. Can init DB with mock data like
```js
   const test = require('../mock/test');

   test.category_mock();
   test.customer_mock();
   test.product_mock();
   test.order_mock();
```

### How to run
```js
  npm install
```
Node Version: v6.6.0
