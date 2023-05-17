const homeCarousel = require('../Models/home_carrusel.model');
const Category = require('../Models/category.model');
const Products = require('../Models/producto.model');

const AddhomeCarousel = async (req, res) => {

    await homeCarousel.insertMany([
        {
            "image": "home-regalos-slide-1.jpg",
            "category": "pareja"
        },
        {
            "image": "home-regalos-slide-2.jpg",
            "category": "cumpleaños"
        },
        {
            "image": "home-regalos-slide-3.jpg",
            "category": "boda"
        },
        {
            "image": "home-regalos-slide-4.jpg",
            "category": "bautizo"
        },
        {
            "image": "home-regalos-slide-5.jpg",
            "category": "juguetes"
        },
        {
            "image": "home-regalos-slide-6.jpg",
            "category": "others"
        }
    ]);

    res.json({
        resp: true
    });
}


const addCategoryStatic = async (req, res) => {

    await Category.insertMany([
        {
            "category": "pareja",
            "picture": "love-and-romance.svg"
        },
        {
            "category": "cumpleaños",
            "picture": "pastel.svg"
        },
        {
            "category": "boda",
            "picture": "electrodomestico.svg"
        },
        {
            "category": "bautizo",
            "picture": "bautismo.svg"
        },
        {
            "category": "Toys",
            "picture": "juguetes.svg"
        },
        {
            "category": "Others",
            "picture": "otros-app.svg"
        }
    ]);

    res.json({
        resp: true,
        msj : 'Data inserted correctly - Category'
    });

} 


const addProductsStatic = async ( req, res ) => {

    // CATEGORIAS EN BD
    /*
     PAREJA: 64619599c17e81d66d93ff54
     CUMPLEAÑOS: 64619599c17e81d66d93ff55
     BODA: 64619599c17e81d66d93ff56
     BAUTIZO: 64619599c17e81d66d93ff57
    */

    await Products.insertMany([
        {
            "nameProduct": "Arreglo de girasoles",
            "description": "Arreglo con 7 girasoles y brillantina",
            "codeProduct": "0000001",
            "stock" : 15,
            "price": 20.99,
            "status": "active",
            "picture": "pareja-1.jpg",
            "category_id" :"64619599c17e81d66d93ff54"
        },
        {
            "nameProduct": "Ramo de rosa",
            "description": "Ramo de 12 rosas",
            "codeProduct": "0000002",
            "stock" : 15,
            "price": 15.99,
            "status": "active",
            "picture": "pareja-2.jpg",
            "category_id" :"64619599c17e81d66d93ff54"
        },
        {
            "nameProduct": "Regalo de cumpleaños Rayo Mcqueen",
            "description": "Goblos de estrellas y globo de Rayo Mcqueen",
            "codeProduct": "0000003",
            "stock" : 15,
            "price": 20.99,
            "status": "active",
            "picture": "cumpleaños-2.jpg",
            "category_id" :"64619599c17e81d66d93ff55"
        },
        {
            "nameProduct": "Arreglo de rosas y chocolates",
            "description": "Arreglo de 24 rosas y chocolates Ferrero",
            "codeProduct": "0000004",
            "stock" : 15,
            "price": 30.99,
            "status": "active",
            "picture": "cumpleaños-1.jpg",
            "category_id" :"64619599c17e81d66d93ff55"
        },
        {
            "nameProduct": "Arreglo de flores para mesa",
            "description": "Arreglo de flores blancas para centro de mesa",
            "codeProduct": "0000005",
            "stock" : 15,
            "price": 30.99,
            "status": "active",
            "picture": "boda-2.jpg",
            "category_id" :"64619599c17e81d66d93ff56"
        },
        {
            "nameProduct": "Arreglo de flores pequeño",
            "description": "Arreglo de flores pequeños para bodas",
            "codeProduct": "0000006",
            "stock" : 15,
            "price": 20.99,
            "status": "active",
            "picture": "boda-1.jpg",
            "category_id" :"64619599c17e81d66d93ff56"
        },
        {
            "nameProduct": "Cajitas para sorpresas",
            "description": "Cajas para sorpresas para bautizos",
            "codeProduct": "0000007",
            "stock" : 15,
            "price": 15.99,
            "status": "active",
            "picture": "bautizo-2.jpg",
            "category_id" :"64619599c17e81d66d93ff57"
        },
        {
            "nameProduct": "Recuerdos para bautizo",
            "description": "Recuerdos para bautizos niño y niña",
            "codeProduct": "0000008",
            "stock" : 15,
            "price": 20.99,
            "status": "active",
            "picture": "bautizo-1.jpg",
            "category_id" :"64619599c17e81d66d93ff57"
        },
        
    ]);

    res.json({
        resp: true,
        msj : 'Data inserted correctly - Products'
    });

}


module.exports = {
    AddhomeCarousel,
    addCategoryStatic,
    addProductsStatic
}