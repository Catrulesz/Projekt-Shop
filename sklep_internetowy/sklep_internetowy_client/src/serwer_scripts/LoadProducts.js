const LoadProducts = async function (offset){
    try{ 
        const call = await fetch("http://localhost:9000/products", {
        method : 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset}),
        })               
        .then(res=> res.json());
        return call;
      }
      catch(e)
    {
        console.log(e.message);
    }
}

const SearchProducts = async function (offset,search,price,mark,diagonal,frequency,ram){
    try{ 
        const call = await fetch("http://localhost:9000/products/searched", {
        method : 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"product" :{offset,search,price,mark,diagonal,frequency,ram}}),
        })               
        .then(res=> res.json());
        return call;
      }
      catch(e)
    {
        console.log(e.message);
    }
}


export default {
    LoadProducts,
    SearchProducts
};