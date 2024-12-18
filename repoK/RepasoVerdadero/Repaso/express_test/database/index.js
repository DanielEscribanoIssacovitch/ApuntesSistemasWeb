const database = {};

database.users = require('./models/user.model');


function initializeUsers(){
    const NAMES = ["carlos", "paloma", "alvaro", "javi"];
    database.users.register("admin", "admin", "admin");
    NAMES.forEach((username) => {
        database.users.register(username, "1234", "user");
    });
}

function initializeDB(){
    initializeUsers();
    console.log("Base de datos inicializada");
}


initializeDB();

module.exports = database;