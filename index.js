const express=require("express")
const app=express()

const port=process.env.PORT || 3000
//middleware->to parse json to brower
app.use(express.json());

// input is taken as query parameter and inside body 
var users=[{
    name:'John',
    kidneys:[{
            healthy:false
        },{
            healthy:true
        }]
}];

app.get('/',(req,res)=>{
  let johnKidney=users[0].kidneys;
  let noOfKidneys=johnKidney.length;
  let noOfHealthyKidneys=0;
  for(let i=0;i<johnKidney.length;i++){
    if(johnKidney[i].healthy){
        noOfHealthyKidneys=noOfHealthyKidneys+1;
    }
  }
  let noOfUnhealthyKidneys=noOfKidneys-noOfHealthyKidneys;

  res.json({
    noOfKidneys,
    noOfHealthyKidneys,
    noOfUnhealthyKidneys
  })

})


app.post('/',(req,res)=>{
  const isHealthy=req.body.isHealthy;
  users[0].kidneys.push({
    healthy:isHealthy
  })

  res.json({
    "msg":"Succesfull"
  })
})


//update all kidney to healthy
app.put('/',(req,res)=>{
  
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
      }
      res.json({});
  
})



//user can remove unhealthy kidney
app.delete('/',(req,res)=>{
  if(atleastOne()){
    const arr=[];
    for(let i=0;i<users[0].kidneys.length;i++){
      if(users[0].kidneys[i].healthy) arr.push({
          healthy:true
      })
    }
    users[0].kidneys=arr;
    res.json({msg:"Done"})

  }else{
    res.status(411).json({
        msg:"You have no unhealthy kidneys"
    })
  }
 

})

function atleastOne(){
    let atleastOneUnhealthyKidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastOneUnhealthyKidney=true;
        }
      }
      return atleastOneUnhealthyKidney;
}



app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})