const EventEmitter=require('events');
const em=new EventEmitter();
const fs=require('fs')

const rr=fs.createReadStream('data.json');

rr.on('data',(data)=>{
    console.log(data);
})
rr.on('end',(data)=>{
    console.log(data);
})

em.on('demo',()=>{
    console.log("demo");
})

setTimeout(()=>em.emit('demo'),5000)