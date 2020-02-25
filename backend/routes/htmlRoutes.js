//jshint esversion:6
const pages=require('../controllers/htmlControllers');
const postpages=require('../controllers/loginController');
const express=require('express');
const dbConn=require('../databases/sqlite');
const lists=dbConn.lists;
const router=express.Router();
const middle=require('../controllers/middle');

const redirectLogin=middle.redirectprofile;

const redirectHome=middle.redirectHome;


router.route('/').get(pages.homepage);
router.route('/').post((req,res)=>{
    res.redirect('/');
  });

router.route('/logout').get(redirectLogin,(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log('Error logging out: ',err);
            res.redirect('/');
          }
          res.clearCookie('user');
          res.redirect('/');
      });
    
  });


// router.route('/profile').destroy()


router.route('/signin').get(redirectHome,pages.signIn);
router.route('/signup').get(redirectHome,pages.signUp);
router.route('/signin').post(postpages.signIn);
router.route('/signup').post(postpages.signUp);

router.route('/add').post(redirectLogin,(req,res)=>{
    const { item }=req.body;
    lists.create({
        item:item,
        edit:false,
        done:'false',
        user_id:req.session.userId
      }).then(list=>{
          console.log(list);
          return res.redirect('/');
        }).catch(err=>{
            console.log('Couldn\'t add into lists database , Error occured:  ',err);
          });
  });

router.route('/delete/:id').post(redirectLogin,(req,res)=>{
    const itemId=parseInt(req.params.id);
    lists.destroy({
        where:{
            id:itemId
          }
      }).then(rows=>{
          console.log("Rows deleted : ",rows);
          return res.redirect('/');
        }).catch(err=>{
            console.log("Error occured while deleting : ",err);
          });
  });

router.route('/edit/:id').post(redirectLogin,(req,res)=>{
    const itemId=parseInt(req.params.id);
    const { item }=req.body;
    lists.update({
      item:item,
      edit:true,
      done:'false',
      user_id:req.session.userId
      }, {
          where:{
              id:itemId
            }
        }).then(list=>{
            console.log(list);
            res.redirect('/');
          }).catch(err=>{
              console.log('Error updating : ',err);
              res.redirect('/');
            });
  });
router.route('/done/:id').post(redirectLogin, (req, res) => {
  const itemId = parseInt(req.params.id);
  lists.findOne({
    where: {
      id: itemId
    }
  }).then(list => {
    const d = list.dataValues.done;
    console.log('Inside done route', d);
    if (d === 'false')
      updateTo = 'true';
    else
      updateTo = 'false';
    lists.update({
      done: updateTo
    }, {
      where: {
        id: itemId
      }
    }).then(list => {
      console.log(list);
      res.redirect('/');
    }).catch(err => {
      console.log('Error while updating done', err);
      res.redirect('/');
    });
  }).catch(err => {
    console.log(err);
    res.redirect('/');
  });
});


module.exports=router;
