// SERVIDOR
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//INCLUYO FUNCIONES DECLARADAS DESDE MONGODB.JS
const { connectToMongoDB, disconnectToMongoDB } = require('./src/mongoDb')

//BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MIDDLEWARE
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

//RUTA RAIZ
app.get('/', (req, res) => {
    res.status(200).end("Bienvenido a mi API de COMPUTADORAS-GRUPO 5");
});

//METODO GET PARA OBTENER TODAS LAS COMPUTADORAS DE LA DB
app.get('/computadoras', async (req, res) => {
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }
    const db = client.db('elementos')
    const computadoras = await db.collection('computadoras').find().toArray()
    await disconnectToMongoDB()
    res.status(200).json(computadoras);
})

//METODO GET PARA OBTENER UNA COMPUTADORA POR SU ID
app.get('/computadoras/:id', async (req, res) => {
    const computadoraID = parseInt(req.params.id) || 0

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }

    const db = client.db('elementos')
    const computadoras = await db.collection('computadoras').findOne({ id: (computadoraID) })
    await disconnectToMongoDB()
    !computadoras ? res.status(404).send('No encontré el elemento con el ID ' + computadoraID) : res.status(200).json(computadoras)
});

//METODO GET PARA BUSCAR COMPUTADORAS POR NOMBRE O DESCRIPCIÓN
app.get('/computadoras/search', async (req, res) => {
    const { nombre, descripcion } = req.query;

    if (!nombre && !descripcion) { // Verifica si al menos uno de los parámetros está presente
        return res.status(500).send('Por favor, proporciona al menos un término de búsqueda.');
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB')
        return;
    }
    const db = client.db('elementos');
    try {
        // Construye la consulta para buscar computadoras por nombre o descripción
        const query = {};
        if (nombre) {
            query.nombre = { $regex: new RegExp(nombre, 'i') }; // Búsqueda insensible a mayúsculas y minúsculas
        }
        if (descripcion) {
            query.descripcion = { $regex: new RegExp(descripcion, 'i') }; // Búsqueda insensible a mayúsculas y minúsculas
        }

        // Ejecuta la consulta en la base de datos
        const computadoras = await db.collection('computadoras').find(query).toArray();

        res.status(200).json(computadoras);
    } catch (error) {
        console.error('Error al buscar computadoras:', error);
        res.status(500).send('Error al buscar computadoras en la base de datos');
    } finally {
        await disconnectToMongoDB();
    }
});

// POST

// PUT

// DELETE

// RUTA PREDETERMINADA PARA MANEJAR RUTAS INEXISTENTES
app.get("*", (req, res) => {
    res.json({
        error: "404",
        message: "No se encuentra la ruta solicitada",
    });
});

//INICIA EL SERVIDOR
app.listen(PORT, () => console.log(`API de computadoras escuchando en http://localhost:${PORT}`));