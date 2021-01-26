// controllers/dashboard/author.js
class Author{
  constructor(){
    this.deepcopy = require('deepcopy');
    this.vdict = require('../../config');
    this.utility = require('../../utility');
    this.usersdb = require('../../models/usersdb');
    this.emailCheck = require('email-check');
  }

  getAuthor(req, res){
    if(req.session.user){
      const data = this.deepcopy(this.vdict);
      data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
      data.date = this.utility.setDate();
      res.render('dashboard/author', data);
    }else{
      res.redirect('/admin/login');
    }
  }

  postAuthor(req, res){
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();

    if(req.session.user.role == 'Admin'){
      const self = this;
      this.usersdb.checkEmail(req, function(user){
        if(user){
          data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
          res.render('dashboard/author', data);
        }else{
          self.emailCheck(req.body.email)
            .then(function (result) {
              if(result){
                self.usersdb.insertUser(req, function(user, err){
                  if(!err)
                    data.message = `អ្នក​និពន្ធ​ ${user.username} ត្រូវ​បានចុះ​បញ្ជី​រួច​ហើយ`;
                  else
                    data.message = err;

                  res.render('dashboard/author', data);
                });
              }
            })
            .catch(function (err) {
              data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
              res.render('dashboard/author', data);
            });
        }
      });
    }else{
      data.message = 'មាន​តែ Administrator ទេ ​ដែល​អាច​ចុះ​បញ្ជី​អ្នក​និពន្ធ​បាន​';
      res.render('dashboard/author', data);
    }
  }

}//end class

module.exports = new Author();