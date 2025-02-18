const bcrypt = require('bcrypt');

users = {};

users.data = {};

users.savecookies = function(username){
    users.data[username].cookies = true;
}

users.deletecookies = function(username){
    users.data[username].cookies = false;
}

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = function(username, password){
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    users.generateHash(password, function(err, hash){
        if(err){
            throw new Error(`Error al generar el hash de ${username}.`);
        }
        users.data[username] = {username, hash, last_Login: new Date().toISOString};
    });
}

users.isLoginRight = async function(username, password){
    if(!users.data.hasOwnProperty(username)){
        return false;
    }
    return await users.comparePass(password, users.data[username].hash);
}

//Ejemplo del examen ordinario update score:
users.updateScore = function(username, score){
    if(users.data.hasOwnProperty(username)){
        users.data[username].score = score;
    } else {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
}

users.getScores = function(){
    return Object.values(users.data).map(user => ({ username: user.username, score: user.score }));
}

module.exports = users;