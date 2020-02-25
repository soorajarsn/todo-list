// function homepage(req,res){
//     res.sendFile(__dirname+'/../../client/views.profile.html');
//   }
// function singIn(req,res){
//     res.sendFile(__dirname+'/../../client/views/signin.html');
//   }
// function signUp(req,res){
//     res.sendFile(__dirname+'/../../client/views/signup.html');
//   }
  function  homepage(req,res){
      res.render('profile');
    }
  function  signIn(req,res){
      res.render('signin');
    }
  function  singUp(req,res){
      res.render('signup');
    }
  module.exports={
    homepage:homepage,
    signIn:signIn,
    signUp:signUp
  }  ;