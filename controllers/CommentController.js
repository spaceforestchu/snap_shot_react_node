var Comment = require('../models/Comment');

module.exports = {
  get: function(params, isRaw) {
    return new Promise(function(resolve, reject) {

      Comment.find(params, function(err, comments) {
        if (err) {
          reject(err);
          return;
        }
        if (isRaw == true) {
          resolve(comments);
          return;
        } else {
          var list = [];
          comments.forEach(function(post, i) {
            list.push(post.summary());
          });
          resolve(list);
          return;
        }
      })

    })
  },
  getById: function(id, isRaw) {
    return new Promise(function(resolve, reject) {
      Comment.findById(id, function(err, comment) {
        if (err) {
          reject(err);
          return;
        }

        if (isRaw == true) {
          resolve(comment);
          return;
        } else {
          resolve(comment.summary());
          return;
        }

      })
    })
  },

  post: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      Comment.create(params, function(err, comment) {
        if (err) {
          reject(err);
          return;
        }
        if (isRaw == true) {
          resolve(comment);
          return;
        } else {
          resolve(comment.summary());
          return;
        }
        return;
      })
    })
  },
  update: function(id, isRaw, params) {
    return new Promise(function(resolve, reject) {
      Comment.findByIdAndUpdate(id, params, {
        new: true
      }, function(err, comment) {
        if (err) {
          reject(err);
          return;
        }
        resolve(comment);
        return;
      });
    });
  },
  delete: function(id, isRaw) {
    return new Promise(function(resolve, reject) {
      Comment.findByIdAndRemove(id, function(err, comment) {
        if (err) {
          reject(err);
          return;
        }
        resolve(comment);
        return;
      })
    })
  }
}
