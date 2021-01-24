// models/usersdb.js
class Usersdb{
  constructor(){
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const usersSchema = new mongoose.Schema({
      username: {type: String, required: true},
      password: {type: String, required: true},
      email: {type: String, required: true},
      role: {type: String, required: true},
      date: {type: Date, required: true}
    });

    const users = mongoose.model('users', usersSchema);
    this.users = users;

    users.findOne(function (err, user){
      if (err) return console.error(err);
      if(!user){
        const hash = bcrypt.hashSync('password', 12);
        const root = new users({username:'root', password:hash, email:'root@multimedia.com', role:'Admin', date: new Date()});
        root.save(function (err, root){
          if (err) return console.error(err);
        });
      }
    });
  }

}//end class

module.exports = new Usersdb();