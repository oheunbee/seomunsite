const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();

const {check, validationResult} = require('express-validator');

const db = require('./../db.js');

router.use(expressLayouts);
  //route routing
  router.get('/', (req,res) => {
  res.render('index');
  //서문시장야시장의 메인페이지를 지정하세요
});

  router.get('/page2', (req,res) => {
    res.render("page2");
  });
  router.get('/login', (req,res) => {
    res.render("login");
  });
  router.get('/newMemo', (req,res) => {
    res.render("notice_write");
  });
  router.get('/page3', (req,res) => {
    db.getAllMemos((rows) => {
      res.render('page3', { rows : rows })
  })
  });
  router.get('/page4', (req,res) => {
    let id = req.query.id;
    db.getMemoById(id, (row) => {
        if (typeof id === 'undefined' || row.length <= 0 )  {
            res.status(404).json({error:'undefined memo'});
        } else {
            res.render('page4' , {row:row[0]})
        }
    })
  });

  router.get('/join', (req,res) => {
    res.render("join");
  });
  
  //updated 때문에 추가
  router.get('/layout', (req,res) => {
    res.render("layout");
  });


router.post('/store',
  check('content').isLength({ min: 1, max: 500 }),
  function (req, res, next) {
  let errs = validationResult(req);
  console.log(errs);
  if(errs['errors'].length > 0){ //화면에 에러 출력하기 위함
    res.render('newMemo',{errs:errs['errors']});
  } else{
    let param = JSON.parse(JSON.stringify(req.body));
    db.insertMemo(param['content'],param['title'],param['writer'],() =>{
      res.redirect('page3');
    });
  }
});

router.get('/updateMemo', (req, res) => {
    let id = req.query.id;

    db.getMemoById(id, (row) => {
        if (typeof id === 'undefined' || row.length <= 0 )  {
            res.status(404).json({error:'undefined memo'});
        } else {
            res.render('updateMemo' , {row:row[0]})
        }
    })
});

router.post('/updateMemo',
    [check('content').isByteLength({min : 1, max: 300})],
    (req, res) => {
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        let title = param['title'];
        let writer = param['writer'];
        if (errs['errors'].length>0) {
            db.getMemoById(id, (row) => {
                res.render('updateMemo', {row:row[0], errs:errs['errors']})
            })
        } else {
            db.updateMemoById(id, content, title, writer, () => {
                res.redirect('page3');
            })
        }
    });
    
    router.get('/deleteMemo' , (req, res) => {
        let id = req.query.id;
        db.deleteMemoById(id, () => {
            res.redirect('page3');
        });
    });


  module.exports = router;