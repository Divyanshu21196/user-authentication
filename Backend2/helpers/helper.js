/*
|----------------------------------------------------------------------------------------------------------------------------
|   Helpers File
|----------------------------------------------------------------------------------------------------------------------------
|
|   All helper methods in this file.
|
*/

const bcrypt = require('bcrypt');
var uuid = require('uuid').v4;
var path = require('path');
/*
|----------------------------------------------------------------------------------------------------------------------------
|   Exporting all methods
|----------------------------------------------------------------------------------------------------------------------------
*/
module.exports = {
  vaildObject: async function (required, nonRequired, res) {
    let message = '';
    let empty = [];

    for (let key in required) {
      if (required.hasOwnProperty(key)) {
       
        if (required[key] == undefined || required[key] == '') {
          empty.push(key);
        }
      }
    }
  //  console.log(empty,"empty")
    if (empty.length != 0) {
      message = empty.toString();
      if (empty.length > 1) {
        message += " fields are required"
      } else {
        message += " field is required"
      }
      res.status(400).json({
        'success': false,
        'msg': message,
        'code': 400,
        'body': {}
      });
      return;
    } else {

      const mergeObject = Object.assign(required, nonRequired);
     // console.log(mergeObject,"mergeObject")
      delete mergeObject.checkexit;
      for (let data in mergeObject) {
        if (mergeObject[data] == undefined) {
          delete mergeObject[data];
        } else {
          if (typeof mergeObject[data] == 'string') {
            mergeObject[data] = mergeObject[data].trim();
          }
        }
      }
      //console.log(mergeObject,"mergeObject")
      return mergeObject;
    }
  },


  imageUpload: (file, folder) => {

    let image = file;

    var extension = path.extname(image.name);
    //console.log(extension,"extension")
    var fileimage = uuid() + extension;
    image.mv(process.cwd() + '/public/' + folder + '/' + fileimage, function (err) {
      if (err)
        console.log(err);
    });

    return fileimage;
  },

  bcryptHash: (myPlaintextPassword, saltRounds = 10) => {

    const salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(myPlaintextPassword, salt);
    hash = hash.replace('$2b$', '$2y$');
    return hash;
  },

  comparePass: async (requestPass, dbPass) => {
    dbPass = dbPass.replace('$2y$', '$2b$');
    const match = await bcrypt.compare(requestPass, dbPass);
    return match;
  },

  error: function (res, err, req) {
  //  console.log(err.message, '===========================>error');
    let code = (typeof err === 'object') ? (isNaN(Number(err.code))) ? 403 : (err.code) ? err.code : 403 : 403;
    let message = (typeof err === 'object') ? (err.message ? err.message : '') : err;
//console.log(message,"message")
    if (req) {
      req.flash('flashMessage', { color: 'error', message });

      const originalUrl = req.originalUrl.split('/')[1];
      return res.redirect(`/${originalUrl}`);
    }

    return res.status(code).json({
      'success': false,
      'message': message,
      'code': code,
      'body': {}
    });

  },
  getBaseUrl:function(req,res,folder){
    let baseUrl=req.protocol+"://"+req.headers.host+"/"+ folder+"/"

    return baseUrl
  },
  true_status: function (res, body, msg) {
    res.status(200).json({
      'success': 1,
      'code': 200,
      'msg': msg,
      'data': body,
    });
    return false;
  },

  false_status: function (res, msg) {
    res.status(400).json({
      'success': 0,
      'code': 400,
      'msg': msg,
      'data': [],
    });
    return false;
  },
  wrong_status: function (res, msg) {
    res.status(400).json({
      'success': 0,
      'code': 400,
      'msg': msg,
      'data': {},
    });
    return false;
  },
}