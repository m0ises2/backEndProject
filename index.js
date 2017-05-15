const MongoClient = require('mongodb').MongoClient;
const app = require('./app');
const config = require('./config');
const assert = require('assert');

// Conexión a la base de datos:
MongoClient.connect(config.db, (err, db) => {
    assert.equal(null, err);

    app.listen(config.port, () => {
        console.log('Connected to database. Server Up and Running');
    });
});
