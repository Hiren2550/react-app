const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan"); //Third Party midddleware

app = express();
const data = JSON.parse(fs.readFileSync("data.json"));
const product = data.products[2];

//create Middleware  by using req.get() we get Request-Header value
// app.use((req,res,next)=>{
//     console.log(req.method,req.ip,req.hostname,new Date(),req.get('Connection'),req.get('User-Agent'));
//     next()
// })

//app.use(morgan('dev'));
app.use(morgan('dev',"default"));

app.use(express.json()); //it is used to tell express to read body (json type)
//app.use(express.urlencoded())  //it for form-data

//it is used for static file
app.use(express.static("public"));

//Middleware : request modified ,parsed,request static hosting,get the data from request,Authentication
//create logs
// const auth=(req,res,next)=>{
//     //console.log(req.query);
//     if(req.body.password=='123')
//     {
//         next();
//     }
//     else{
//         res.sendStatus(401);
//     }
// }

//API - EndPoint - Route
// app.get('/',(req,res)=>{
//     res.json({type:'Get'})
// })
// app.post('/',auth,(req,res)=>{
//     res.json({type:'POST'})
// })
// app.put('/',(req,res)=>{
//     res.json({type:'PUT'})
// })
// app.patch('/',(req,res)=>{
//     res.json({type:'PATCH'})
// })
// app.delete('/',(req,res)=>{
//     res.json({type:'DELETE'})
// })

app.get("/product/:id", (req, res) => {
    console.log(req.params);
    res.send('This is sending of data in request')
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(80, () => console.log("Server run at port 80"));
