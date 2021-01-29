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

  async getAuthor(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();
    data.authors = await this.usersdb.selectUser(this.vdict.dashboardLimit); 
    data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
    data.count = await self.usersdb.countUser();
          
    if(req.params.authorId){
      data.edited = await self.usersdb.selectUser(self.vdict.dashboardLimit, req.params.authorId);
      res.render('dashboard/author', data);
    }else
      res.render('dashboard/author', data);
  }

  async postAuthor(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();
  
    if(req.session.user.role == 'Admin'){
      const user = await this.usersdb.checkEmail(req);
      if(user){
        data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
        data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
        data.count = await self.usersdb.countUser();
        data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
        res.render('dashboard/author', data);
      }else{
        self.emailCheck(req.body.email)
          .then(async function (result) {
            if(result){
              const user = await self.usersdb.insertUser(req);
              data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit); 
              data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
              data.count = await self.usersdb.countUser();
              data.message = `អ្នក​និពន្ធ​ ${user.username} ត្រូវ​បានចុះ​បញ្ជី​រួច​ហើយ`;
              res.render('dashboard/author', data);  
            }
          }).catch(async function (err) {
            data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
            data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
            data.count = await self.usersdb.countUser();
            data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
            res.render('dashboard/author', data);
          });
      }

    }else{
      data.authors = await this.usersdb.selectUser(self.vdict.dashboardLimit);
      data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
      data.count = await self.usersdb.countUser();
      data.message = 'មាន​តែ Administrator ទេ ​ដែល​អាច​ចុះ​បញ្ជី​អ្នក​និពន្ធ​បាន​';
      res.render('dashboard/author', data);
    }
  }

  async updateAuthor(req, res){
    const self = this;
    const data = this.deepcopy(this.vdict);
    data.site_title = 'ទំព័រ​អ្នក​និពន្ធ';
    data.date = this.utility.setDate();
    
    if((req.session.user.role === "Admin") || (req.session.user.userid === req.params.authorId)){
      const user = await this.usersdb.checkEmail(req);
      
      if(user && (req.params.authorId != user.userid)){
        data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
        data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
        data.count = await self.usersdb.countUser();
        data.message = 'Email នេះ​មាន​គេ​ប្រើ​ប្រាស់​ហើយ​';
        res.render('dashboard/author', data);
      }else{
        self.emailCheck(req.body.email)
          .then(async function (result) {
            if(result){
              if(req.session.user.role === "Admin"){
                data.author = await self.usersdb.updateUser(req);
                data.message = `ទិន្នន័យ​អ្នក​និពន្ធ​ ${data.author.username} ត្រូវ​បាន​កែ​តំរូវ​`;
                data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
                data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
                data.count = await self.usersdb.countUser();   
                res.render('dashboard/author', data);
              }else if(req.session.user.userid === user.userid){
                console.log(req.session.user.userid === user.userid);
                data.author = await self.usersdb.updateUser(req);
                data.message = `ទិន្នន័យ​អ្នក​និពន្ធ​ ${data.author.username} ត្រូវ​បាន​កែ​តំរូវ​`;
                data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
                data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
                data.count = await self.usersdb.countUser();   
                res.render('dashboard/author', data);
              }
            }
          })
          .catch(async function (err) {
            data.authors = await self.usersdb.selectUser(self.vdict.dashboardLimit);
            data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
            data.count = await self.usersdb.countUser();
            data.message = 'Email នេះ​មិន​ត្រឹមត្រូវ​ទេ';
            res.render('dashboard/author', data);
          });
      }
    
   }else{
      data.authors = await this.usersdb.selectUser(self.vdict.dashboardLimit);
      data.thumbs = self.utility.getThumbUrl(data.authors, 'author');
      data.count = await self.usersdb.countUser();
      data.message = 'មាន​តែ Administrator ឬ​សមី​ខ្លូន​ទេ ដែល​អាច​ដូរ​ទិន្នន័យអ្នក​​និពន្ធ​បាន​';
      res.render('dashboard/author', data);
    }
  }

}//end class

module.exports = new Author();