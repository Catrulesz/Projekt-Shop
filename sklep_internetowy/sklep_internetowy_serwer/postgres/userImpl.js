const { queryResult } = require('pg-promise');

const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@localhost:5432/shop');


exports.loadUsers= async function loadUsers(){
    try{
        return await db.many('SELECT * FROM users',(data)=>{
            console.log(data);
            const usertable=[];
            for (var i=0; i<data.length ;i++)
            {
                console.log('generating user id:',
                [data[i].user_id,
                data[i].username,
                data[i].login,
                data[i].password,
                data[i].roleadmin]);
                
                usertable.push(data[i]);         
            }
        });
    }
    catch(e){
        console.error(e);
    }
};

exports.CheckUser = async function CheckUser(userLogin,password){
    try{
        user =await db.one('SELECT username FROM users where login = $1 AND password = $2', [userLogin,password]);
        console.log(typeof(user));
        return user;
    }
    catch(e){
        console.error(e);
        console.log("invalid login");
        return false;
    }
        
}


exports.LookForUserAndAdd = async function LookForUserAndAdd(username,login,password){

    try{
        return db.task('LookForUserAndAdd', async t=>{
            user = await t.oneOrNone('SELECT username FROM users where login = $1', [login], u =>u && u.username);
            console.log(user);
            if (user == null)
            {
                await t.one('insert into users (username, login, password, roleadmin) values ($1, $2, $3, false) returning username', [username,login,password]);
                return true; 
            }
            else
                return false;
            //return user || await t.one('insert into users (username, login, password, roleadmin) values ($1, $2, $3, false) returning username', [username,login,password])
        });
    }
    catch(e){
        console.error(e);
        return false;
    }
}

