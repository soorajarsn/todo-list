
//jshint esversion:6
const dbConn=require('../databases/sqlite');
const users=dbConn.users;
const lists=dbConn.lists;
function homepage(req, res) {
  if (!req.session.userId)
    return res.render('profile', {
      user: undefined,
      msg: 'Please login to manage your todos',
      list: []
    });
  else
    users.findOne({
      where: {
        id: req.session.userId
      }
    }).then(user => {
        if (user) {
          // Set-Cookie: sessionId=1;

          console.log("User(inside home route handling method) : ", user);
          console.log('Session(inside home route) : ', req.session);
          console.log('SessionID(req.sessionID) : ', req.sessionID);
          console.log('Set UserId(inside home route) for the session:', user.id);
          console.log('req.session.userId : ', req.session.userId);

          lists.findAll({
            where: {
              user_id: user.id
            }
          }).then(list => {
            var todos = [];
            for (var i = 0; i < list.length; i++) {
              todos.push(list[i].dataValues);
            }
            console.log('todos : ', todos);
            return res.render('profile', {
              msg: 'Hey welcome!!!',
              user: user.name, //because of this we are to find user from user table
              list: todos //because of this we are to find list from lists table of our database;
            });
          }).catch(err => {
            console.log(err);
            return res.redirect('/signin');
          });
        }
        }).catch(err => {
        console.log(err);
        return res.redirect('/signin');
      });

    }

  function signIn(req, res) {
    res.render('signin',{user:'true'});
  }

  function signUp(req, res) {
    res.render('signup',{
      msg:undefined
    });
  }
  module.exports = {
    homepage: homepage,
    signIn: signIn,
    signUp: signUp
  };
