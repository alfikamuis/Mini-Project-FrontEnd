const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;     // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({ id: .1 })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({ message: "No products found" });
            }
        })
        .catch(err => console.log(err));
});

/* get all category*/

router.get('/categories', function (req, res) {       // Sending Page Query Parameter is mandatory http://localhost:3636/api/categories

    database.table('categories')
        .withFields(['id', 'title'])
        .getAll().then((list) => {
            if (list.length > 0) {
                res.json({ users: list });
            } else {
                res.json({ message: 'category not found' });
            }
        }).catch(err => res.json(err));
});

/* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id',
            'p.images'
        ])
        .filter({ 'p.id': productId })
        .get()
        .then(prod => {
            console.log(prod);
            if (prod) {
                res.status(200).json(prod);
            } else {
                res.json({ message: `No product found with id ${productId}` });
            }
        }).catch(err => res.json(err));
});

/* GET ALL PRODUCTS FROM ONE CATEGORY */
router.get('/category/:catName', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    // Get category title value from param
    const cat_title = req.params.catName;

    database.table('products as p')
        .join([
            {
                table: "categories as c",
                on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
            }
        ])
        .withFields(['c.title as category',
            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'
        ])
        .slice(startValue, endValue)
        .sort({ id: 1 })
        .getAll()
        .then(prods => {
            if (prods.length > 0) {
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            } else {
                res.json({ message: `No products found matching the category ${cat_title}` });
            }
        }).catch(err => res.json(err));

});


/* UPDATE product DATA */
router.patch('/:productId', async (req, res) => {
    let productId = req.params.productId;     // Get the User ID from the parameter

    // Search User in Database if any
    let product = await database.table('products').filter({ id: productId }).get();
    if (product) {

        let pTitle = req.body.name;
        let PDescription = req.body.description;
        let pPrice = req.body.price;
        let pQuantity = req.body.quantity;
        let pCatId = req.body.category;
        let pImage = req.body.image;

        let category = await database.table('categories').filter({ title: pCatId }).get();

        // Replace the user's information with the form data ( keep the data as is if no info is modified )
        database.table('products').filter({ id: productId }).update({
            title: pTitle !== undefined ? pTitle : product.title,
            description: PDescription !== undefined ? PDescription : product.description,
            price: pPrice !== undefined ? pPrice : product.price,
            quantity: pQuantity !== undefined ? pQuantity : product.quantity,
            cat_id: category.id !== undefined ? category.id : product.cat_id,
            image: pImage !== undefined ? pImage : product.image,
        }).then(result => res.json('User updated successfully')).catch(err => res.json(err));
    }
});


/* add product DATA */
router.post('/create', async (req, res) => {

    let pname = req.body.name;
    let pdescription = req.body.description;
    let pprice = req.body.price;
    let pquantity = req.body.quantity;
    let pcategories = req.body.category;
    let pimage = req.body.image;

    let pcat = await database.table('categories').filter({ title: pcategories }).get();

    database.table('products').insert({
        title: pname,
        description: pdescription,
        price: pprice,
        quantity: pquantity,
        cat_id: pcat.id,
        image: pimage

    }).then(result => res.json('add product successfully')).catch(err => res.json(err));

});


/* delete product DATA */
router.delete('/:productId', async (req, res) => {
    let productId = req.params.productId;     // Get the User ID from the parameter

    if (!isNaN(productId)) {
        database.table("products").filter({ id: productId }).remove()
            .then(successNum => {
                if (successNum == 1) {
                    res.status(200).json({ message: 'delete product id:' + productId + ' succesfully', status: 'success' });
                } else {
                    res.status(404).json({ message: 'cant delete product', status: 'error' });
                }
            })
    }
});

module.exports = router;
