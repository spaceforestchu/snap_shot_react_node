var Post = require('../models/Post');

module.exports = {
  get: function(params, isRaw) {
    return new Promise(function(resolve, reject){

      //check the params for lat and lng

      if (params.lat != null && params.lng != null) {
        var range = 50/6371;

        params['geo'] = {
          $near: [params.lat, params.lng],
          $maxDistance: range
        }

        delete params['lat']
        delete params['lng']

      }


      var filters = {
        sort: {
          timestamp: -1
        }
      }
      
      Post.find(params, null, filters, function(err, posts){
        if (err) {
          reject(err);
          return;
        }

        if (isRaw == true) {
          resolve(posts);
          return;
        } else {
          var list = [];
          posts.forEach(function(post, i) {
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
      Post.findById(id, function(err, post){
        if (err) {
          reject(err);
          return;
        }

        if (isRaw == true) {
          resolve(post)
        } else {
          resolve(post.summary());
          return;
        }

      })
    })
  },

  post: function(params, isRaw) {
    return new Promise(function(resolve, reject){
      Post.create(params, function(err, post){
        if (err) {
          reject(err);
          return;
        }
        if (isRaw == true) {
          resolve(post)
        } else {
          resolve(post.summary());
          return;
        }
      })
    })
  },
  update: function(id, isRaw, params) {
    return new Promise(function(resolve, reject) {
      Post.findByIdAndUpdate(id, params, {new: true}, function(err, post) {
        if (err) {
          reject(err);
          return;
        }
        resolve(post);
        return;
      });
    });
  },
  delete: function(id, isRaw) {
    return new Promise(function(resolve, reject) {
      Post.findByIdAndRemove(id, function(err, post) {
        if (err) {
          reject(err);
          return;
        }
        resolve(post);
        return;
      })
    })
  }

}
