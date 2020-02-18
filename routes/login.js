var express = require('express');
var router = express.Router();
var firebase = require('../connections/firebase_connect');
var firebaseDb = require('../connections/firebase_admin_connect')
var fireAuth = firebase.auth();
router.get('/', function (req, res) {
    res.render('login', { title: '登入',error: req.flash('error')});
})
router.post('/', function (req, res) {
    fireAuth.signInWithEmailAndPassword(req.body.email,req.body.passwd)
    .then(function(user){
        req.session.uid = user.user.uid;
        res.redirect('/');
        console.log('登入成功');
    })
    .catch(function(error){
        var errorMessage = error.message;
        switch(errorMessage) {
            case 'The email address is badly formatted.':
                errorMessage = '電子郵件地址格式錯誤';
                break;
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                errorMessage = '查無此信箱';
                break;  
            case 'The password is invalid or the user does not have a password.':
                errorMessage = '密碼錯誤';
                break;  
        }
        console.log('登入失敗');
        req.flash('error',errorMessage);
        res.redirect('/login')
    })
})
module.exports = router;