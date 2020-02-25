//jshint esversion:6
const dbConn = require('../databases/sqlite');
const users = dbConn.users,
  lists = dbConn.lists;

function signup(req, res) {
  const {
    name,
    email,
    password
  } = req.body;
  console.log(req.body);
  if (!(name && email && password)) {
    console.log('err');
    return res.render('signup', {
      msg: undefined
    });
  } else {
    users.create({
        name,
        email,
        password
      })
      .then(user => {
        if(user){
        console.log("User(inside post singup handling method) : ", user);

        req.session.userId = user.id;

        console.log('Session(inside post signup) : ', req.session);
        console.log('SessionID(req.sessionID) : ', req.sessionID);
        console.log('Set UserId(inside post signup) for the session:', user.id);
        console.log('req.session.userId : ', req.session.userId);
        res.render('profile', {
          msg: 'User successfully created',
          user: user.name,
          list: []
        });
        }else{
          res.redirect('/signup');
        }
      })
      .catch(err => {
        if (err.parent.errno == 19) {
          console.log(err);
          return res.render('signup', {
            msg: 'Email already exists!!!'
          }); //You can pass message that user already exists
          //errno=19 can be because of null entry that is not possible here, and it can also be for
          //duplicate entry in unique column
        } else {
          console.log(err);
          return res.render('profile', {
            user: undefined,
            msg: 'Error in creating user',
            list: []
          });
        }
      });
  }
}

function signin(req, res) {
  const Useremail = req.body.email,
    Userpassword = req.body.password;
  users.findOne({
    where: {
      email: Useremail,
      password: Userpassword
    }
  }).then(user => {
    console.log(user);
    if (user) {
      // Set-Cookie: sessionId=1;

      console.log("User(inside post singin handling method) : ", user);
      console.log('Session(inside post signin) : ', req.session);
      console.log('SessionID(req.sessionID) : ', req.sessionID);
      console.log('Set UserId(inside post signin) for the session:', user.id);
      console.log('req.session.userId : ', req.session.userId);


      req.session.userId = user.id;
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
          msg: 'User successfully logged in',
          user: user.name,
          list: todos
        });
      }).catch(err => {
        console.log(err);
        return res.render('/signin', {
          user: 'Error signing in!!!'
        });
      });


    } else {
      return res.render('signin', {
        user: user
      });
    }
  }).catch(err => {
    console.log(err);
    return res.render('/signin', {
      user: 'Error signing in!!!'
    });
  });
}

module.exports = {
  signIn: signin,
  signUp: signup
};
