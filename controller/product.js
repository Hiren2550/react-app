const fs= require('fs');
// const data=JSON.parse(fs.readFileSync('data.json'));
// let products=data.products;
const model=require("../model/product");
const Product=model.Product;

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
     const products=await Product.find({})
     res.json(products);
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