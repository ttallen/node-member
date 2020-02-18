var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();
var firebaseDb = require('../connections/firebase_admin_connect');
const val = [
    check('content')
      .notEmpty()
      .withMessage('內容不得為空'),
      check('content')
      .isLength({ max: 15 })
      .withMessage('內容不得超過15個字符')
  ];
router.post('/', val, function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash('errors', errors.array()[0].msg);
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