const pages=require('../controllers/htmlControllers');
const express=require('express');

const router=express.Router();

router.route('/').get(pages.homepage);
router.route('/signin').get(pages.signIn);
router.route('/signup').get(pages.signUp);

module.exports=router;
