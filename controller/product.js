const fs= require('fs');
const path=require('path');
// const data=JSON.parse(fs.readFileSync('data.json'));
// let products=data.products;
const model=require("../model/product");
const Product=model.Product;

const ejs=require('ejs');

exports.getAllProductsSSR=async(req,res)=>{
    const products=await Product.find({})
    console.log("ssr")
    ejs.renderFile(path.join(__dirname,'../pages/index.ejs'),{products:products},function(err, str){
        // str => Rendered HTML string
        res.send(str)
    });
}
exports.getAddForm=async(req,res)=>{
    ejs.renderFile(path.join(__dirname,'../pages/form.ejs'),function(err, str){
        // str => Rendered HTML string
        res.send(str)
    });
}


exports.createProduct =async(req,res)=>{
   
    const product=new Product(req.body);
        try
        {
            const data=await product.save();
            console.log(data);
            res.status(200).json(data);
        }
        catch(error)
        {
            console.log(error);
            res.status(400).json(error);
        }

    //res.json(req.body)
}


exports.getAllProducts=async(req,res)=>{
        
        let query=Product.find();
        console.log(req.query);
        if(req.query.sort){
            
            const products=await query.sort({[req.query.sort]:req.query.order}).limit(req.query.limit).exec();
            res.json(products);  
            //localhost:8000/products?sort=rating&order=asc&limit=2
            //localhost:8000/products?sort=price&order=desc&limit=2
            //localhost:8000/products?sort=discountPercentage&order=desc&limit=4
        }
        else
        {
            const products=await query.exec();
            res.json(products);  
        }
     
}



exports.getProduct=async(req,res)=>{
    const id=req.params.id
    const product=await Product.findById(id);
    console.log(product);
    res.json(product);
}

exports.replaceProduct=async(req,res)=>{
    const id=req.params.id
    try{
        
        const doc=await Product.findOneAndReplace({_id:id},req.body,{new:true})
        res.status(201).json(doc);
    }
    catch(error){

        res.status(400).json(error);
        console.log(error);
    }
    
}

exports.updateProduct=async(req,res)=>{
    const id=req.params.id
    try{
        
        const doc=await Product.findOneAndUpdate({_id:id},req.body,{new:true})
        res.status(201).json(doc);
    }
    catch(error){

        res.status(400).json(error);
        console.log(error);
    }
}


exports.deleteProduct=async(req,res)=>{
    const id=req.params.id

    try{
        const deleteDoc=await Product.findOneAndDelete({_id:id})
        res.status(201).json(deleteDoc);
    }
    catch(error){
        res.status(400).json(error);
        console.log(error);
    }
}