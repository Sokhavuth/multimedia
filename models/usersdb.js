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
      info: {type: String, required: true},
      date: {type: Date, required: true}
    });

    const users = mongoose.model('users', usersSchema);
    this.users = users;
    this.bcrypt = bcrypt;

    users.findOne(function (err, user){
      if (err) return console.error(err);
      if(!user){
        const hash = bcrypt.hashSync('password', 12);
        const root = new users({username:'root', password:hash, email:'root@multimedia.com', role:'Admin', info:'test', date: new Date()});
        root.save(function (err, root){
          if (err) return console.error(err);
        });
      }
    });
  }

  checkUser(req, callback){
    this.users.findOne({email:req.body.email}, function (err, user){
      if (err) return console.error(err);
      return callback(user);
    });
  }

  checkEmail(req, callback){
    this.users.findOne({email:req.body.email}, function (err, user){
      if (err) return console.error(err);
      return callback(user);
    });
  }

  insertUser(req, callback){
    const hash = this.bcrypt.hashSync(req.body.password, 12);
    const user = new (this.users)({username:req.body.username, password:hash, email:req.body.email, role:req.body.role, info:req.body.info, date: new Date(req.body.date)});
    user.save(function (err, user){
      if (err) return callback(false, err);
      return callback(user, false)
    });
  }

}//end class

module.exports = new Usersdb();