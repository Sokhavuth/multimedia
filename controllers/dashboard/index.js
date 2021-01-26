// controllers/dashboard/index.js
class Index{
  constructor(){
    this.deepcopy = require('deepcopy');
    this.vdict = require('../../config');
    //this.usersdb = require('../models/usersdb');
  }

  getIndex(req, res){
    if(req.session.user){
      const data = this.deepcopy(this.vdict);
      data.site_title = "ទំព័រ​គ្រប់គ្រង";
      res.render('dashboard/index', data);
    }else{
      res.redirect('/admin/login');
    }
  }  

}//end class

module.exports = new Index();