require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "define": {
      "underscored": true
    }
  },  
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "define": {
      "underscored": true
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_PRODUCTION,
    "host": process.env.DB_HOST,
    "seederStorage": "sequelize",
    "seederStorageTableName": "sequelize_data",
    "dialect": "mysql"
  }
}
