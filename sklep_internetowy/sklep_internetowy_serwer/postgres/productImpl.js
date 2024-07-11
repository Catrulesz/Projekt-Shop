const { query } = require('express');
const { search } = require('../routes');


const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:postgres@localhost:5432/shop');

exports.loadProduct = async function (offset){
    try{
        products =await db.many('SELECT * FROM laptops limit 12 offset $1', offset)
        console.log(typeof(products));
        return products;
    }
    catch(e)
    {
        console.error(e);
        console.log("nieznaleziono produktów");
        return false;
    }
};

exports.searchProducts = async function (filter){
    var search= "%" + filter.search + "%";
    try{
        products = await db.many('SELECT * FROM laptops where lower(name) like lower($2) limit 12 offset $1',[filter.offset,search]);
        console.log(typeof(products));
        return products;
    }
    catch(e)
    {
        console.error(e);
        console.log("brak produktow");
        return false;
    }
}

exports.filterProducts = async function (filter)
{
    var sqlQuery = 'SELECT * FROM laptops  WHERE' ;
    var addAnd = false;
    var search = '';
    var ram = '';
    var frequency = '';
    var diagonal = '';

    if (filter.search != '')
        {
            search ='%' + filter.search+ '%' 
            
            sqlQuery += ' lower(name) like lower($2)';
            addAnd = true;
        }
    
    if (filter.price != 'brak')
        {
            if(addAnd == true)
            sqlQuery += ' AND';
            sqlQuery += ' price BETWEEN $3 AND $4';
            addAnd=true;
        }
    if (filter.mark != 'brak')
        {
            if(addAnd == true)
            sqlQuery += ' AND'; 
            sqlQuery += ' lower(mark) like lower($5)';         
            addAnd=true;
        }
    if (filter.diagonal != 'brak')
        {
            diagonal = filter.diagonal + '%';
            if(addAnd == true)
            sqlQuery += ' AND'; 
            sqlQuery += ' screen like $6';         
            addAnd=true;
        }
    if (filter.frequency != 'brak')
        {
            frequency = '%'+filter.frequency;
            if(addAnd == true)
            sqlQuery += ' AND'; 
            sqlQuery += ' lower(screen) like lower($7)';         
            addAnd=true;
        }
    if (filter.ram != 'brak')
        {
            ram = filter.ram+'%';
            if(addAnd == true)
            sqlQuery += ' AND'; 
            sqlQuery += ' lower(ram) like lower($8)';         
            addAnd=true;
        }

    sqlQuery += ' limit 12 offset $1';

    try{
        products = await db.manyOrNone(sqlQuery,[filter.offset, search, filter.price[0], filter.price[1], filter.mark, diagonal, frequency, ram]);
        console.log(typeof(products));
        return products;
    }
    catch(e)
    {
        console.error(e);
        console.log("brak produktow");
        return false;
    }
}