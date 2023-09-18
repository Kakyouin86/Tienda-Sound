require('dotenv').config();

module.exports={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": mysql,
    "port": process.env.DB_PORT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": mysql,
    "port": process.env.DB_PORT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": mysql,
    "port": process.env.DB_PORT
  }
}

/*
module.exports={
  "development": {
    "username": "aguslima",
    "password": "edfXe3Da!Ew.f*v",
    "database": "aguslima_tiendasound",
    "host": "mysql-aguslima.alwaysdata.net",
    "dialect": "mysql"
  },
  "test": {
    "username": "aguslima",
    "password": "edfXe3Da!Ew.f*v",
    "database": "aguslima_tiendasound",
    "host": "mysql-aguslima.alwaysdata.net",
    "dialect": "mysql"
  },
  "production": {
    "username": "aguslima",
    "password": "edfXe3Da!Ew.f*v",
    "database": "aguslima_tiendasound",
    "host": "mysql-aguslima.alwaysdata.net",
    "dialect": "mysql"
  }
}*/
