// controllers/login.js
class Login{
  constructor(){
    this.deepcopy = require('deepcopy');
    this.vdict = require('../config');
    this.usersdb = require('../models/usersdb');
    this.bcrypt = require('bcryptjs');
  }

  getLogin(res){
    const data = this.deepcopy(this.vdict);
    data.site_title = "ទំព័រ​ចុះ​ឈ្មោះ";
    res.render('login', data);
  }

  postLogin(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    this.usersdb.checkUser(req, function(user){
      if(user){
        if(self.bcrypt.compareSync(req.body.password, user.password)){
          req.session.user = user;
          res.redirect('/admin/dashboard');
        }else{
          data.message = 'ពាក្យ​សំងាត់​មិនត្រឹមត្រូវ​ទេ';
          res.render('login', data);
        }
      }else{
        data.message = 'Email ​មិន​ត្រឹមត្រូវ​ទេ';
        res.render('login', data);
      }
    });
  }

}//end class

module.exports = new Login();