const RegisterCheck = async function (username,login,password){
    try{ 
        const call = await fetch("http://localhost:9000/users/register", {
        method : 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"user" :{ username, login, password}}),
        })               
        .then(res=> res.json());
        return call.message;
      }
      catch(e)
    {
        console.log("error",e.message);
    }
}



export default RegisterCheck;