# Backend Dummy mysql + phpMyAdmin + Node.js

```sh
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);

```

# users 
```sh
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let userFirstName = req.body.fname;
        let userLastName = req.body.lname;
        let userUsername = req.body.username;
        let age = req.body.age;
        
```

# Products
```sh
        title: pTitle !== undefined ? pTitle : product.title,
        description: PDescription !== undefined ? PDescription : product.description,
        price: pPrice !== undefined ? pPrice : product.price,
        quantity: pQuantity !== undefined ? pQuantity : product.quantity,
        cat_id: category.id !== undefined ? category.id : product.cat_id,
        image: pImage !== undefined ? pImage : product.image,
```

# Order 
```sh
       order_id: newOrderId,
       product_id: p.id,
       quantity: inCart
```

# Auth
```sh
        let email = req.body.email;
        let username = email.split("@")[0];
        let password = await bcrypt.hash(req.body.password, 10);
        let fname = req.body.fname;
        let lname = req.body.lname;
```
