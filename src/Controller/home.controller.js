const { response } = require('express');
const Category = require('../Models/category.model');
const Carousel = require('../Models/home_carrusel.model');
const Products = require('../Models/producto.model');

const HomeCarouselSilder = async (req, res = response) => {
    try {
      const carousel = await Carousel.find({}).exec();
  
      res.json({
        resp: true,
        msj: 'List Images - Home',
        slider: carousel
      });
    } catch (err) {
      return res.status(400).json({
        resp: false,
        msj: 'Error: Sin Lista de imágenes',
        err
      });
    }
  };
  
  const ListCategoriesHome = async (req, res = response) => {
    try {
      const listCategories = await Category.find({}).limit(10).exec();
  
      res.json({
        resp: true,
        msj: 'Lista de categorias',
        categories: listCategories
      });
    } catch (err) {
      return res.status(400).json({
        resp: false,
        msj: 'Error: Sin Lista de Categorias',
        err
      });
    }
  };
  
  const ListProductsHome = async (req, res = response) => {
    try {
      const productsdb = await Products.find({})
        .populate('category_id', 'category')
        .limit(10)
        .exec();
  
      res.json({
        resp: true,
        msj: 'Lista Productos Home',
        products: productsdb
      });
    } catch (err) {
      return res.status(500).json({
        resp: false,
        msj: 'Error: Sin Lista de Productos'
      });
    }
  };
  
  const ListCategoriesAll = async (req, res = response) => {
    try {
      const listCategories = await Category.find({}).exec();
  
      res.json({
        resp: true,
        msj: 'Lista de todas las Categorias',
        categories: listCategories
      });
    } catch (err) {
      return res.status(400).json({
        resp: false,
        msj: 'Error: Sin Lista de Categorias',
        err
      });
    }
  };
  
  module.exports = {
    HomeCarouselSilder,
    ListCategoriesHome,
    ListProductsHome,
    ListCategoriesAll
  };
  