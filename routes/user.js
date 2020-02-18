var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
router.get('/', function (req, res) {
    firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){
        res.render('user', { title: '個人頁面',nickname: snapshot.val().nickname,username: snapshot.val().username,email: snapshot.val().email});
    })
})
module.exports = router; 