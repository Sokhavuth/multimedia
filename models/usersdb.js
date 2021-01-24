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
    this.bcrypt = bcrypt;

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

  checkUser(req, res, vdict){
    const self = this;
    this.users.findOne({username:req.body.username}, function (err, user){
      if (err) return console.error(err);
      if(user){
        if(self.bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user.username;
          vdict.message = '';
          res.redirect('/users/dashboard');
        }else{
          vdict.message = 'ពាក្យ​សំងាត់​មិនត្រឹមត្រូវ​ទេ';
          res.redirect('/users/login');
        }
      }else{
        vdict.message = 'ឈ្មោះ​អ្នក​ប្រើប្រាស់​មិន​ត្រឹមត្រូវ​ទេ';
        res.redirect('/users/login');
      }
    });
  }

}//end class

module.exports = new Usersdb();