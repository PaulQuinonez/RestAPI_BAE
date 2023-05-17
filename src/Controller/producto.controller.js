const { response } = require('express');
const Products = require('../Models/producto.model');
const Favorite = require('../Models/favorite.model');
const OrderBuy = require('../Models/orderBuy.model');
const OrderDetails = require('../Models/orderDetails.model');

const addFavoriteProduct = async (req, res = response) => {
    const { uidProduct, uidUser } = req.body;

    try {
        const favoritedb = await Favorite.findOne({ product_id: uidProduct }).exec();

        if (!favoritedb) {
            await new Favorite({
                product_id: uidProduct,
                user_id: uidUser
            }).save();

            return res.json({
                resp: true,
                msj: 'Producto agregado a favoritos'
            });
        }

        await Favorite.findByIdAndRemove(favoritedb._id).exec();

        res.json({
            resp: true,
            msj: 'Product removed from favorites'
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error: No se pudo agregar/eliminar el producto favorito',
            err
        });
    }
};

const productFavoriteForUser = async (req, res = response) => {
    try {
        const uidUser = req.uid;

        const favoritedb = await Favorite.find({ user_id: uidUser })
            .populate('product_id')
            .exec();

        res.json({
            resp: true,
            msj: 'Lista de productos favoritos',
            favorites: favoritedb
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error: Error al recuperar los productos favoritos del usuario',
            err
        });
    }
};

const saveOrderProducts = async (req, res = response) => {
    try {
        const { receipt, date, amount, products } = req.body;
        const uid = req.uid;

        const orderBuydb = await new OrderBuy({
            user_id: uid,
            receipt: 'Ticket',
            datee: date,
            amount: amount
        }).save();

        const orderDetailsPromises = products.map(e => {
            return new OrderDetails({
                product_id: e.uidProduct,
                orderBuy_id: orderBuydb._id,
                quantity: e.amount,
                price: e.price
            }).save();
        });

        await Promise.all(orderDetailsPromises);

        res.json({
            resp: true,
            msj: 'Productos guardados'
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error: Error al insertar datos en la orden de compra',
            err
        });
    }
};

const getPurchasedProducts = async (req, res = response) => {
    try {
        const uid = req.uid;

        const orderBuydb = await OrderBuy.findOne({ user_id: uid }).exec();

        const orderDetailsdb = await OrderDetails.find({ orderBuy_id: orderBuydb._id })
            .populate('product_id', 'picture nameProduct price')
            .exec();

        res.json({
            resp: true,
            msg: 'Obtener productos comprados',
            orderBuy: orderBuydb,
            orderDetails: orderDetailsdb
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error: Fallo la obtención de la orden de compra',
            err
        });
    }
};

const getProductsForCategories = async (req, res = response) => {
    try {
        const productsdb = await Products.find({ category_id: req.params.id })
            .populate('category_id', 'category')
            .exec();

        res.json({
            resp: true,
            msj: 'Lista de productos por ID de categoría',
            products: productsdb
        });
    } catch (err) {
        return res.status(500).json({
            resp: false,
            msj: 'Error: No se pudo obtener los productos por ID de categoria',
            err
        });
    }
};

module.exports = {
    addFavoriteProduct,
    productFavoriteForUser,
    saveOrderProducts,
    getPurchasedProducts,
    getProductsForCategories
}