// models/usersdb.js
class Usersdb{
  constructor(){
    const mongoose = require('mongoose');

    const usersSchema = new mongoose.Schema({
      name: {type: String, required: true},
      email: {type: String, required: true},
      role: {type: String, required: true}
    });

    const users = mongoose.model('users', usersSchema);
    this.users = users;

    users.findOne(function (err, user){
      if (err) return console.error(err);
      if(!user){
        const root = new users({name:'root', email:'root@multimedia.com', role:'Admin'});
        root.save(function (err, root){
          if (err) return console.error(err);
        });
      }
    });
  }

}//end class

const usersdb = new Usersdb();

module.exports = usersdb;