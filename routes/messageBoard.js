var express = require('express');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
router.post('/', function (req, res) {
    req.checkBody("content","內容不得為空值").notEmpty();
    req.checkBody("content","內容不得超過30個字符").len(1, 30);
    var errors = req.validationErrors();
    if(errors){
        req.flash('errors',errors[0].msg);
        res.redirect('/');
    }else{
        firebaseDb.ref('user/'+req.session.uid).once('value',function(snapshot){
            var nickname = snapshot.val().nickname;
            var ref = firebaseDb.ref('list');
            var listContent = {
                nickname: nickname,
                content: req.body.content
            }
            ref.push().set(listContent)
            .then(function(){
                res.redirect('/');
            })
        })
    }
})
module.exports = router;