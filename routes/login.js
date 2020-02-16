var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
var firebaseDb = require('../connections/firebase_admin_connect')
var fireAuth = firebase.auth();
router.get('/', function (req, res) {
    res.render('login', { title: '登入' });
})
router.post('/', function (req, res) {
    fireAuth.signInWithEmailAndPassword(req.body.email,req.body.passwd)
    .then(function(user){
        req.session.uid = user.uid;
        res.redirect('/');
        console.log('登入成功');
    })
    .catch(function(error){
        res.redirect('/');
        console.log(error);
        console.log('登入失敗');
    })
})
module.exports = router;