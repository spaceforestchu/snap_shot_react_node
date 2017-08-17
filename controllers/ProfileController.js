var Profile = require('../models/Profile');
var bcrypt = require('bcryptjs');


module.exports = {
  get: function(params, isRaw) {
    return new Promise(function(resolve, reject){

      Profile.find(params, function(err, profiles){
        if (err) {
          reject(err);
          return;
        }
      if (isRaw == true) {
        resolve(profiles);
        return;
      } else {
        var list = [];
        profiles.forEach(function(post, i) {
          list.push(post.summary());
        });
        resolve(list);
        return;
      }
      })

    })
  },
  getById: function(id, isRaw) {
    return new Promise(function(resolve, reject){

      Profile.findById(id, function(err, profile){
        if (err) {
          reject(err);
          return;
        }

        if (isRaw == true) {
          resolve(profile);
          return;
        } else {

          if (profile == null) {
            resolve(profile);
            return;
          }
          resolve(profile.summary());
          return;
        }

      })
    })
  },

  post: function(params, isRaw) {
    return new Promise(function(resolve, reject){

      if (params['password']) {
          params['password'] = bcrypt.hashSync(params.password, 10);
      }

      Profile.create(params, function(err, profile){
        if (err) {
          reject(err);
          return;
        }
        if (isRaw == true) {
          resolve(profile);
          return;
        } else {
          resolve(profile.summary());
          return;
        }
      })
    })
  },
  update: function(id, isRaw, params) {
    return new Promise(function(resolve, reject) {
      Profile.findByIdAndUpdate(id, params, {new: true}, function(err, profile) {
        if (err) {
          reject(err);
          return;
        }
        resolve(profile);
        return;
      });
    });
  },
  delete: function(id, isRaw) {
    return new Promise(function(resolve, reject) {
      Profile.findByIdAndRemove(id, function(err, profile) {
        if (err) {
          reject(err);
          return;
        }
        resolve(profile);
        return;
      })
    })
  }
}
