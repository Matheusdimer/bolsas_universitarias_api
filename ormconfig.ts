module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": 5432,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": false,
  "ssl": "true",
  "extra": {
      "ssl": {
        "rejectUnauthorized" : false
      }
  },
  "entities": [
    "src/model/**/*.{js,ts}",
    "model/**/*.{js,ts}"
  ],
  "cli": {
    "entitiesDir": "dist/src/model",
    "migrationsDir": "dist/src/migration",
    "subscribersDir": "dist/src/subscriber"
  }
}
