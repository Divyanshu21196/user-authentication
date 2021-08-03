const Jwt = require('jsonwebtoken');
const models = require('../models');
const User= models.users
module.exports = (req, res, next) => {
  var token;

  if (req.headers && req.headers.token) {
    const credentials = req.headers.token;
    token = credentials;
  } else {
    return res.status(401).json({
      'success': 0,
      'code': 401,
      'msg': 'ACCESS DENIED !! You are not authorize to access this Resource!',
      'data': {},
    });
  }
  Jwt.verify(token, 'secret', async (err, decoded) => {
   // console.log(decoded,"decoded");return
    if (err) {
      return res.status(401).json({
        'success': 0,
        'code': 401,
        'msg': 'The token is not valid!',
        'data': {},
      });
    } else {
      let userDetail = await User.findOne({
        where: {
          email: decoded.email,
        },
        raw: true
      })
      req.user = userDetail;
      next()
    }
  });
};
