var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
var firebase = require('../connections/firebase_connect');
var fireAuth = firebase.auth();
router.get('/', function (req, res, next) {
    firebaseDb.ref('list').once('value',function(snapshot){
        var auth = req.session.uid;
        res.render('index', {
            title: '留言板',
            auth: auth,
            errors: req.flash('errors'),
            list: snapshot.val()
        });
    })
});

router.post('/', (req, res) => {
    fireAuth.signOut()
      .then(() => {
        console.log('登出成功');
        req.session.uid = null;
        res.redirect('/');
      })
      .catch((error) => {
        console.log('登出錯誤', error.message);
      });
});
/* GET home page. */
module.exports = router;