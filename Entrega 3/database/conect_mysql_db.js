
const { Sequelize } = require('sequelize');


// ENVIRONMENT
const dotenv = require('dotenv');
dotenv.config()

const database ={
     DB_HOST: process.env.DB_HOST || 'localhost',
     DB_USER: process.env.DB_USER || 'root',
     DB_PASS: process.env.DB_PASS || '85943',
     DB_NAME: process.env.DB_NAME || "trailerflix",
     DB_PORT: process.env.DB_PORT || "3306",
     dialect:  process.env.DB_DIALECT || "mysql",
    }


   const sequelize = new Sequelize(database.DB_NAME, database.DB_USER , database.DB_PASS, {
    host: database.DB_HOST,
    dialect: database.dialect 
    });

    async function authenticate() {
      try{
        await sequelize.authenticate ();
        console.log ('Conexion exitosa a la BD');
      } catch(error){
        console.error('Error al conectarse a la BD:' , error);
      }
      
    }

    authenticate()
