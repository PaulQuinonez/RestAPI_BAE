const express = require('express');
const cors = require('cors')
const conexionDB = require('./Database/config.database')
const bodyParser = require('body-parser')
const path = require('path');
require('dotenv').config();

//INICIACION DE APP
const app = express();

// ROUTES
const auth_routes = require('./Routes/auth.route');
const user_routes = require('./Routes/user.route');
const producto_routes = require('./Routes/producto.route');

// CONEXION DB
conexionDB();

//CORS
app.use(cors());

// Middleware
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

//CONFIG SERVER
app.use(bodyParser.json()); //ASI USAMOS ARCHIVOS JSON
app.use(bodyParser.urlencoded({ extended: true })); //NOS SERVIRA EN LOS FORMULARIO
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//USO DE RUTAS DEFINIENDO EL PADRE
app.use('/api/auth', auth_routes);
app.use('/api/user', user_routes);
app.use('/api/producto', producto_routes);

// UPLOADS
app.use( express.static( path.join( __dirname, 'Uploads/Profile') ));
app.use( express.static( path.join( __dirname, 'Uploads/Home' )));
app.use( express.static( path.join( __dirname, 'Uploads/Products' )));
app.use( express.static( path.join( __dirname, 'Uploads/Categories' )));

//INDICAMOS QUE PUERTO USAREMOS
const port = process.env.PORT || 3000;

//CONFIGURAMOS POR DONDE SE ESCUCHARA EL SERVIDOR
app.listen(port, function() {
    console.clear();
    console.log("\nServidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");
    console.log("*******************************************");
});