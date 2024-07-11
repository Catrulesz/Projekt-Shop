

export default function Product({id,loadProductPage,product}){
    

    if (product[id].name!='')
        {
        return(
            <div class="product-item" onClick={()=>loadProductPage(id)}>
                    <img src={product[id].image}></img>
                    <h3>{product[id].name}</h3>
                    <p>Cena {product[id].price} zł</p>
            </div>
        );
    }
    else{
        return(<p></p>);
    }
}