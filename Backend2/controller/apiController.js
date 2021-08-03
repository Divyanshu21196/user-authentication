const sequelize = require("sequelize");
const Op = sequelize.Op;
const models = require("../models");
const users = models.users
const userDetails = models.userDetails
const usersPosts = models.usersPosts
const postComments = models.postComments
const helper = require("../helpers/helper");
const jwt = require('jsonwebtoken');


module.exports = {
  userSignup: async function (req, res) {
    // console.log(req,"===================")
    try {
      // console.log(req,"===================")
      var data = req.body;
      const required = {
        email: data.email,
        zipcode: data.zipcode,
        name: data.name,
        password: data.password
      };
      const nonRequired = {
        phone: data.phone,
        mobile: data.mobile,
        lat:data.lat,
        lng:data.lng
      };

      let requestData = await helper.vaildObject(required, nonRequired, res);
      // console.log(req,"============");return
      let checkUserEmail = await users.count({
        where: {
          email: requestData.email
        }
      });
      if (checkUserEmail > 0) {
        let msg = 'Email Already exist please use another';
        helper.wrong_status(res, msg)
        return
      }

      let Password = helper.bcryptHash(requestData.password);

      let token = jwt.sign({ email: requestData.email }, 'secret', { expiresIn: "2h" })

      let createUser = await users.create({
        email: req.body.email,
        password: Password,
        token: token
      });

      var uploadUserImage = ''
      var folder = 'userImages'
      if (req.files && req.files.image) {
        var uploadUserImage = await helper.imageUpload(req.files.image, folder)
      }

      let createUserDetails = await userDetails.create({
        userId: createUser.id,
        name: requestData.name,
        zipcode: requestData.zipcode,
        phone: requestData.phone,
        mobile: requestData.mobile,
        lat: requestData.lat,
        lng: requestData.lng,
        image: uploadUserImage
      })

      let baseUrl = await helper.getBaseUrl(req, res, folder)

      let getUser = await userDetails.findOne({
        attributes: ['id', 'userId', 'name', 'zipcode', 'phone', 'mobile', 'lat', 'lng', [sequelize.literal(`(IF (image='', '', CONCAT('${baseUrl}',image)) )`), 'image']],
        where: {
          userId: createUser.id
        },
        raw: true
      });
      console.log(getUser,"===========================")
      getUser.email = requestData.email
      getUser.token = token
      let msg = 'Sign up successfully';
      helper.true_status(res, getUser, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  userLogin: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        email: data.email,
        password: data.password
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired, res);

      let checkEmail = await users.findOne({
        attributes: ['id', 'password', 'email'],
        where: {
          email: requestData.email,
        },
        raw: true
      });

      if (checkEmail == null) {
        let msg = 'Email or password is incorrect.';
        helper.wrong_status(res, msg)
        return
      }

      let checkPassword = await helper.comparePass(
        requestData.password,
        checkEmail.password
      );
      if (!checkPassword) {
        let msg = 'Email or password is incorrect.';
        helper.wrong_status(res, msg)
        return
      }
      let token = jwt.sign({ email: requestData.email }, 'secret', { expiresIn: "2h" })

      let updateToken = await users.update({
        token: token
      }, {
        where: {
          id: checkEmail.id
        }
      });

      let updateDeviceDetail = await userDetails.update({
        deviceType: requestData.deviceType,
        deviceToken: requestData.deviceToken,
      }, {
        where: {
          userId: checkEmail.id
        }
      })
      let folder = "userImages"
      let baseUrl = await helper.getBaseUrl(req, res, folder)

      let getUser = await userDetails.findOne({
        attributes: ['id', 'userId', 'name', 'mobile', 'phone', [sequelize.literal(`(IF (image='', '', CONCAT('${baseUrl}',image)) )`), 'image']],
        where: {
          userId: checkEmail.id
        },
        raw: true
      });
      getUser.email = requestData.email
      getUser.token = token
      let msg = 'Log in successfully';
      helper.true_status(res, getUser, msg)

    } catch (err) {
      return helper.error(res, err);
    }
  },
  getProfile: async function (req, res) {
    try {
      const required = {};
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired, res);
        console.log(req.user.id,"===========================")
      let getUserProfile = await userDetails.findOne({
        attributes:[`id`, `userId`, `name`, `image`, `zipcode`, `phone`, 'mobile', [sequelize.literal(`(SELECT email FROM users WHERE id = ${req.user.id})`), 'email']],
        where: {
          userId: req.user.id
        },
        raw:true
      })
      let msg = 'User Profile';
      helper.true_status(res, getUserProfile, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  }
}