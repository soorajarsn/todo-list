const express=require('express');
const logger=require('morgan');
const compression=require('compression');
const cors=require('cors');
const routes=require('./backend/routes/htmlRoutes');
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser=require('cookie-parser');

const app=express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));
app.use(logger('dev'));
app.use(cookieParser());
app.set('views',__dirname+'/client/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(session({
    name:'userId',
    secret:'konfinitySecretKey',
    resave:false,
    saveUninitialized:false,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
  }));

app.use('/',routes);

app.set('port',process.env.PORT || 4000);

app.listen(app.get('port'),()=>{
    console.log('App started running at '+app.get('port'));
  });
  
module.exports=app;  