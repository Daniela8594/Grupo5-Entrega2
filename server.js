// SERVIDOR
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//INCLUYO FUNCIONES DECLARADAS DESDE MONGODB.JS
const {connectToMongoDB, disconnectToMongoDB} = require('./src/mongoDb')

//BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// MIDDLEWARE
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

//RUTA RAIZ
app.get('/', (req, res) => {
    res.status(200).end("Bienvenido a mi API de PELICULAS-GRUPO 5");
});

//METODO GET PARA OBTENER TODOS LOS ELEMENTOS DE LA DB
app.get('/trailerflix', async (req, res) => {
    const client = await connectToMongoDB();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }
    const db = client.db('peliculas')
    const trailerflix = await db.collection('trailerflix').find().toArray()
    await disconnectToMongoDB()
    res.status(200).json(trailerflix);
})

//METODO GET PARA OBTENER UN DOCUMENTO POR SU ID
app.get('/trailerflix/:id', async (req, res) => {
    const trailerflixID = parseInt(req.params.id) || 0

    const client = await connectToMongoDB();
    if(!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }

    const db = client.db('peliculas')
    const trailerflix = await db.collection('trailerflix').findOne({id: trailerflixID})
    await disconnectToMongoDB()
    !trailerflix ? res.status(404).send('No encontre la pelicula o serie con el ID '+ trailerflixID): res.status(200).json(trailerflix)
});

// POST 

// PUT

// DELETE

// RUTA PREDETERMINADA PARA MANEJAR RUTAS INEXISTENTES
app.get("*",(req, res) => {
    res.json({
        error: "404",
        message: "No se encuentra la ruta solicitada",
    });
});

//INICIA EL SERVIDOR
app.listen(PORT, () => console.log(`API de peliculas escuchando en http://localhost:${PORT}`));