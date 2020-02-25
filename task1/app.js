const express=require('express');
const logger=require('morgan');
const compression=require('compression');
const cors=require('cors');
const routes=require('backend/routes/htmlRoutes');
const bodyParser=require('body-parser');

const app=express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client'));
app.use(logger('dev'));

app.set('views',__dirname+'/client/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use('/',routes);

app.set('port',system.env.PORT || 4000);

app.listen(app.get('port'),()=>{
    console.log('App started running at '+app.get('port'));
  });
  
module.exports=app;  