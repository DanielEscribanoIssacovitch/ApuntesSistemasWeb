const database = {};

database.user = require('./models/user.models');

function initializeUsers(){
    const NAMES = ["alberto", "ana", "daniel", "silvia"];
    database.user.register("admin", "admin", "admin");
    NAMES.forEach(function(username){
        database.user.register(username, "1234", "user");
    });
}

function initializeDB(){
    initializeUsers();
    console.log("Base de datos inicializada");
}

initializeDB();

module.exports = database;