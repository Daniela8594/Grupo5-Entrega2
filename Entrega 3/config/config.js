module.exports= {
    PORT : process.env.PORT || "3001",

    // DATABASE
database : {
       
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_USER: process.env.DB_USER || 'root',
            DB_PASS: process.env.DB_PASS || '85943',
            DB_NAME: process.env.DB_NAME || "trailerflix",
            DB_PORT: process.env.DB_PORT || "3306",
            dialect:  process.env.DB_DIALECT || "mysql",
        
    }
}