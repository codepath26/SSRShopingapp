const { response } = require('express');
const Product = require('../models/product');

exports.getProducts =async(req, res, next) => {
  try{  
    let products = awaitProduct.findAll()
    res.status(201).json(products);
  }
  catch(err)
  {res.status(500).json({err : "internal sever erro"})}
}
exports.getProduct = async(req, res, next) => {
  try{
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
     res.status(201).json(product);
    })
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }
   
};

exports.getIndex = async(req, res, next) => {
  try{
  let products = await Product.findAll()
   res.status(201).json(products)
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }  
};

exports.getCart =async (req, res, next) => {
  try{
    let cart = await req.user.getCart();
    let products = cart.getProducts();
    res.status(201).json(products);
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};




exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let newQuantity = 1;

    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      product = await Product.findByPk(prodId);
    }

    await cart.addProduct(product, {
      through: { quantity: newQuantity }
    });

    res.redirect('/cart');
  } catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};

exports.postCartDeleteProduct =async (req, res, next) => {
  try{
    const prodId = req.body.productId;
    let cart = await req.user.getCart()
    let products = await cart.getProducts({ where: { id: prodId } });
        const product = products[0];
        let result = await product.cartItem.destroy();
        res.redirect("/cart");
      }
  catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 

    
};


exports.postOrder = async (req, res, next) => {
  try {
    let fetchedCart;

    const cart = await req.user.getCart();
    fetchedCart = cart;

    const products = await cart.getProducts();

    const order = await req.user.createOrder();
    const orderProducts = products.map(product => {
      return {
        ...product,
        orderItem: { quantity: product.cartItem.quantity }
      };
    });
    
    await order.addProducts(orderProducts);
    await fetchedCart.setProducts(null);

    res.redirect('/orders');
  } catch (error) {
    res.status(500).json({err : "internal sever erro"})
    
  }
};


exports.getOrders = async (req, res, next) => {
  try {

let orders = await req.user.getOrders({include: ['products']})
res.status(201).json(orders);
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }
  
}





















