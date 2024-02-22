const http=require('http');
const fs=require('fs');

const data=JSON.parse(fs.readFileSync('./data.json'));
const html=fs.readFileSync('./index.html','utf-8');

const products=data.products;

const server=http.createServer((req,res)=>{

    console.log(req.url,req.method);
    if(req.url.startsWith('/product/')){
      const id=req.url.split('/')[2];
      console.log(id);
      const prd=products.find(p=>p.id===(+id));
      console.log(prd);
      res.setHeader('content-type','text/html');
      let mainHtml=html.replace('**id**',prd.id).replace('**title**',prd.title).replace('**description**',prd.description).replace('**price**',prd.price).replace('**stock**',prd.stock).replace('**rating**',prd.rating).replace('**brand**',prd.brand)
      res.end(mainHtml);
      
      
    }



    // switch (req.url){
    //     case '/':
    //         res.statusCode=200;
    //         res.end("<h1>hello</h1>");
    //         break;

    //     case '/data':
    //         res.writeHead(202,{'content-type':'application/json'})
    //         res.end(JSON.stringify(data));
    //         break;

    //     case '/product':
    //         res.setHeader('content-type','text/html');
    //         res.end(html);
    //         break;
    //      default:
    //         res.end('<h1>This is default Page</h1>')
    // }
})

server.listen(80,()=>{
    console.log('server run at port 80');
})