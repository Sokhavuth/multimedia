// models/usersdb.js
class Usersdb{
  constructor(){
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const usersSchema = new mongoose.Schema({
      username: {type: String, required: true},
      userid: {type: String, required: true},
      password: {type: String, required: true},
      email: {type: String, required: true},
      role: {type: String, required: true},
      info: {type: String, required: false},
      date: {type: Date, required: true}
    });

    const users = mongoose.model('users', usersSchema);
    this.users = users;
    this.bcrypt = bcrypt;

    users.findOne(function (err, user){
      if (err) return console.error(err);
      if(!user){
        const hash = bcrypt.hashSync('password', 12);
        const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
        const root = new users({userid:id, username:'root', password:hash, email:'root@multimedia.com', role:'Admin', info:'test', date: new Date()});
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

  async checkEmail(req){
    return await this.users.findOne({email:req.body.email});
  }

  async insertUser(req){
    const hash = this.bcrypt.hashSync(req.body.password, 12);
    const id = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    const user = new (this.users)({userid:id, username:req.body.username, password:hash, email:req.body.email, role:req.body.role, info:req.body.info, date: new Date(req.body.date)});
    return await user.save();
  }

  async selectUser(amount=5, id=false){
    if(id){
      return await this.users.findOne({userid: id});
    }else{
      return await this.users.find().sort({date: -1, _id: -1}).limit(amount);
    }
  }

  async countUser(){
    return await this.users.countDocuments({});
  }

  async updateUser(req){
    const user = await this.users.findOne({userid:req.params.authorId});
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.info = req.body.info;
    user.date = new Date(req.body.date);
    return await user.save();
  }

}//end class

module.exports = new Usersdb();