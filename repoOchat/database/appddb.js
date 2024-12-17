// appddbb.js
const bcrypt = require('bcrypt');

users = {}
users.data = {}
users.email_user = {};
chat = {}
chat.data = {}

chat.regiterMessage = function(chatTitle, username, message){
    chat.data[chatTitle] = chat.data[chatTitle] || {};
    chat.data[chatTitle][username] = chat.data[chatTitle][username] || [];
    chat.data[chatTitle][username].push(message);
}

chat.getChat = function(chatTitle){  
    const totalChat = []
    chat.data[chatTitle][usename].forEach(user => {
        totalChat.append(chat.data[chatTitle][user])
    });
    return totalChat
}

users.register = function(username, email, password) {
    if(users.data.hasOwnProperty(username)){
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    if(users.data.hasOwnProperty(email)){
        throw new Error(`Ya existe el usuario ${email}.`);
    }
    users.generateHash(password, function(err, hash){
        if (err) {
            res.status(500).send("Server Error")
        }
        users.data[username] = {username, email, hash}
    })
}

users.generateHash = function(password, callback){
    bcrypt.hash(password, 10, callback);
}

users.isLoginRight = async function(email_user, type, password){
    if(type == 'email'){
        if(!users.email_user.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[users.email_user[email_user]].hash);    
    }else{
        if(!users.data.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[email_user].hash);
    }
    
}

users.getEmailByUsername = function(username){
    return users.data[username].email;
}

users.getUsernameByEmail = function(email){
    return users.email_user[email];
}

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

module.exports = users;