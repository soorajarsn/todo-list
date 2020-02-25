const redirectprofile=(req,res,next)=>{
    if(req.session.userId)
      res.redirect('/');
    next();
  };
  const redirectHome=(req,res,next)=>{
    if(req.session.userId)
      res.redirect('/');
    next();
  };
module.exports={
  redirectprofile:redirectprofile,
  redirectHome:redirectHome
}