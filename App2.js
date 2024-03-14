//REST API EXAMPLE
//C R U D

const express=require('express');
const fs=require('fs');
const path = require('path');
app=express();

const data=JSON.parse(fs.readFileSync('data.json'));
let products=data.products;

app.use(express.json())

//Products
//REST API 
//API root , base Url ,example - www.google.com/api/v2/

//CREATE API : POST
app.post('/products',(req,res)=>{
    console.log(req.body);
    products.push(req.body);
    res.json(req.body)
})

//Read API : GET /products
app.get('/products',(req,res)=>{
    res.json(products);
})

//Read API : GET /products/:id  single product
app.get('/products/:id',(req,res)=>{
    const id=+req.params.id
    const product=products.find((p)=>p.id===+id)
    console.log(product);
    res.json(product);
})

//UPDATE API : PUT /products/:id  single product
app.put('/products/:id',(req,res)=>{
    const id=+req.params.id
    const productIndex=products.findIndex((p)=>p.id===+id)
    products.splice(productIndex,1,{...req.body,id:id});
    res.status(201).json({"type":'PUT'});
})

//UPDATE API : Patch /products/:id  single product
app.patch('/products/:id',(req,res)=>{
    const id=+req.params.id
    const productIndex=products.findIndex((p)=>p.id===+id)
    const oldProduct=products[productIndex]
    products.splice(productIndex,1,{...oldProduct,...req.body});
    res.status(201).json({"type":'PATCH'});
})

//DELETE API
app.delete('/products/:id',(req,res)=>{
    const id=+req.params.id
    const productIndex=products.findIndex((p)=>p.id===+id)
    products.splice(productIndex,1);
    res.status(201).json({"type":'PUT'});
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'temp.html'));
})



app.listen(80,()=>{
    console.log('Server Started at 80');
})