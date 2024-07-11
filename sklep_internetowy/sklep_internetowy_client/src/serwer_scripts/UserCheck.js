const LoginCheck = async function (login,password){
    try{ 
        const call = await fetch("http://localhost:9000/users/login", {
        method : 'POST',
        mode: 'cors',
        credentials: "include", //--> send/receive cookies
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"user" :{ login, password}}),
        })               
        .then(res=> res.json());
        return call.username;
      }
      catch(e)
    {
        console.log(e.message);
    }
}
export default LoginCheck;