const { Router } = require('express');
const { validateToken } = require('../Middlewares/ValidateToken');
const { addFavoriteProduct, productFavoriteForUser, saveOrderProducts, getPurchasedProducts, getProductsForCategories } = require('../Controller/producto.controller');
const {addCategoryStatic, AddhomeCarousel, addProductsStatic} = require('../Controller/staticData.controller');
const { HomeCarouselSilder, ListCategoriesHome, ListProductsHome, ListCategoriesAll } = require('../Controller/home.controller');

const api = Router();

//PRODUCTO

api.post('/add-Favorite-Product', validateToken, addFavoriteProduct );
api.get('/product-favorite-for-user', validateToken, productFavoriteForUser);
api.post('/save-order-products', validateToken, saveOrderProducts );
api.get('/get-purchased-products', validateToken, getPurchasedProducts );
api.get('/get-products-for-categories/:id', validateToken, getProductsForCategories );

//STATIC DATA

api.get('/add-home-carrusel', AddhomeCarousel);
api.get('/add-categoria', addCategoryStatic);
api.get('/add-producto', addProductsStatic);

//HOME
api.get('/home-carousel', validateToken, HomeCarouselSilder);
api.get('/list-categories-home', validateToken, ListCategoriesHome );
api.get('/list-products-home', validateToken, ListProductsHome);
api.get('/list-all-categories', validateToken, ListCategoriesAll);

module.exports = api;