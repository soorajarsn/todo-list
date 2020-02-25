const Sequelize=require('sequelize');

const sequelize=new Sequelize({
    dialect: 'sqlite',
    storage:'database.sqlite'
  });
  
const users = sequelize.define( 'users' , {
    name:{
        allowNull:false,
        type : Sequelize.STRING
      },
    email:{
        allowNull:false,
        unique:true,
        type : Sequelize.STRING
      },
    password:{
        type : Sequelize.STRING,
        allowNull:false
      }
  });

const lists = sequelize.define( 'lists' , {
    item: {
        type : Sequelize.STRING,
        allowNUll : false 
      },
    edit:{
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
    done:{
        type : Sequelize.STRING,
        allowNull : false
      },
    user_id : {
        type : Sequelize.NUMBER,
        allowNull : false
      } 
  });

sequelize.sync().then(()=>{
    console.log("users table has been successfully created, if one doesn't exist");
  }).catch(err=>{
      console.log('This error occurred : ',err);
    })

sequelize.sync().then(()=>{
    console.log("listss table has been successfully created, if one doesn't exist");
  }).catch(err=>{
      console.log('This error occurred : ',err);
    });
//lists.drop().then(_=>{console.log('deleted');}).catch(_=>{console.log('err deleting');});
// users.create({
//           name:'abc',
//           email:'abc@gmail.com',
//           password:'pass1'
//       }).then((user)=>{
//           console.log(user);
//       }); 
// lists.create({
//     item:'complete web development',
//     done:'false',
//     edit:false,
//     user_id:2
//   }).then((list)=>{
//       console.log(list);
//     });
// users.destroy({
//         where:{
//             id:5
//           }
//       }).then(rows=>{
//           console.log("Rows deleted : ",rows);
//           return res.redirect('/');
//         }).catch(err=>{
//             console.log("Error occured while deleting : ",err);
//           });
module.exports={
  users : users,
  lists : lists
};