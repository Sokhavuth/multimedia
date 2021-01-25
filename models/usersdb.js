// models/usersdb.js
class Usersdb{
  constructor(){
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    const emailCheck = require('email-check');

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
    this.emailCheck = emailCheck;

    users.findOne(function (err, user){
      if (err) return console.error(err);
      if(!user){
        const hash = bcrypt.hashSync('password', 12);
        const root = new users({username:'root', password:hash, email:'root@multimedia.com', role:'Admin', info:false, date: new Date()});
        root.save(function (err, root){
          if (err) return console.error(err);
        });
      }
    });
  }

  checkUser(req, res, data){
    const self = this;
    this.users.findOne({email:req.body.email}, function (err, user){
      if (err) return console.error(err);
      if(user){
        if(self.bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user.email;
          res.redirect('/users/dashboard');
        }else{
          data.message = 'ពាក្យ​សំងាត់​មិនត្រឹមត្រូវ​ទេ';
          res.render('login', data);
        }
      }else{
        data.message = 'ឈ្មោះ​អ្នក​ប្រើប្រាស់​មិន​ត្រឹមត្រូវ​ទេ';
        res.render('login', data);
      }
    });
  }

  insert(req, res, data){
    const self = this;
    this.users.findOne({email:req.body.email}, function (err, user){
      if (err) return console.error(err);
      if(user){
        data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
        res.render('dashboard/author', data);
      }else{
        self.emailCheck(req.body.email)
          .then(function (result) {
            if(result){
              data.message = 'អ្នក​និពន្ធ​ត្រូវ​បានចុះ​ឈ្មោះ​រួច​ហើយ';
              res.render('dashboard/author', data);
            }
          })
          .catch(function (err) {
            data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
            res.render('dashboard/author', data);
          });
      }
    });
  }

}//end class

module.exports = new Usersdb();