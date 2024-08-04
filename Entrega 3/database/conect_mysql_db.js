
const { Sequelize } = require('sequelize');
const { database } = require('../config/config');

// ENVIRONMENT
const dotenv = require('dotenv');
dotenv.config()

    const sequelize = new Sequelize (database.DB_NAME, database.DB_USER , database.DB_PASS, {
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
