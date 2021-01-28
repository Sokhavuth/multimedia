// controllers/dashboard/author.js
class Author{
  constructor(){
    this.deepcopy = require('deepcopy');
    this.vdict = require('../../config');
    this.utility = require('../../utility');
    this.usersdb = require('../../models/usersdb');
    this.emailCheck = require('email-check');
    this.bcrypt = require('bcryptjs');
  }

  getAuthor(req, res){
    const self = this;
    if(req.session.user){
      const data = this.deepcopy(this.vdict);
      data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
      data.date = this.utility.setDate();
      this.usersdb.selectUser(this.vdict.dashboardLimit, function(authors){
        data.authors = authors;
        data.thumbs = self.utility.getThumbUrl(authors, 'author');
        self.usersdb.countUser(function(count){
          data.count = count;
          if(req.params.authorId){
            self.usersdb.selectUser(self.vdict.dashboardLimit, function(author){
              data.edited = author;
              res.render('dashboard/author', data);
            }, req.params.authorId);
          }else
            res.render('dashboard/author', data);
        });
      });
    }else{
      res.redirect('/admin/login');
    }
  }

  postAuthor(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();
    
    if(req.session.user.role == 'Admin'){
      this.usersdb.checkEmail(req, function(user){
        if(user){
          self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
            data.authors = authors;
            data.thumbs = self.utility.getThumbUrl(authors, 'author');
            self.usersdb.countUser(function(count){
              data.count = count;
              data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
              res.render('dashboard/author', data);
            });
          });
        }else{
          self.emailCheck(req.body.email)
            .then(function (result) {
              if(result){
                self.usersdb.insertUser(req, function(user, err){
                  if(!err){
                    self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
                      data.authors = authors;
                      data.thumbs = self.utility.getThumbUrl(authors, 'author');
                      self.usersdb.countUser(function(count){
                        data.count = count;
                        data.message = `អ្នក​និពន្ធ​ ${user.username} ត្រូវ​បានចុះ​បញ្ជី​រួច​ហើយ`;
                        res.render('dashboard/author', data);
                      });
                    });
                  }else{
                    self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
                      data.authors = authors;
                      data.thumbs = self.utility.getThumbUrl(authors, 'author');
                      self.usersdb.countUser(function(count){
                        data.message = err;
                        data.count = count;
                        res.render('dashboard/author', data);
                      });
                    });
                  }
                });
              }
            })
            .catch(function (err) {
              self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
                data.authors = authors;
                data.thumbs = self.utility.getThumbUrl(authors, 'author');
                self.usersdb.countUser(function(count){
                  data.count = count;
                  data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
                  res.render('dashboard/author', data);
                });
              });
            });
        }
      });
    }else{
      this.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
        data.authors = authors;
        data.thumbs = self.utility.getThumbUrl(authors, 'author');
        self.usersdb.countUser(function(count){
          data.count = count;
          data.message = 'មាន​តែ Administrator ទេ ​ដែល​អាច​ចុះ​បញ្ជី​អ្នក​និពន្ធ​បាន​';
          res.render('dashboard/author', data);
        });
      });
    }
  }

  updateAuthor(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();

    this.usersdb.checkEmail(req, function(user){
      if(user.userid !== req.params.authorId){
        self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
          data.authors = authors;
          data.thumbs = self.utility.getThumbUrl(authors, 'author');
          self.usersdb.countUser(function(count){
            data.count = count;
            data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
            res.render('dashboard/author', data);
          });
        });
      }else{
        self.emailCheck(req.body.email)
          .then(function (result) {
            if(result){
              self.usersdb.updateUser(req, function(user){
                data.author = user;
                data.message = `ទិន្នន័យ​អ្នក​និពន្ធ​ ${user.username} ត្រូវ​បាន​កែ​តំរូវ​`;
                self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
                  data.authors = authors;
                  data.thumbs = self.utility.getThumbUrl(authors, 'author');
                  self.usersdb.countUser(function(count){
                    data.count = count;
                    res.render('dashboard/author', data);
                  });
                });
              });
            }
          })
          .catch(function (err) {
            self.usersdb.selectUser(self.vdict.dashboardLimit, function(authors){
              data.authors = authors;
              data.thumbs = self.utility.getThumbUrl(authors, 'author');
              self.usersdb.countUser(function(count){
                data.count = count;
                data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
                res.render('dashboard/author', data);
              });
            });
          });
      }
    });
  }

}//end class

module.exports = new Author();