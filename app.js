

const express    = require("express");
const bodyParser = require("body-parser");
const request    = require("request");
const https      = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){
const first= req.body.FirstName;
const last= req.body.LastName;
const email= req.body.EmailID;


const data= {
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:first,
        LNAME:last
      }

    }
]
};

const jsonData= JSON.stringify(data);

const url     = "https://us9.api.mailchimp.com/3.0/lists/0a4137cb65";
const options={
  method:"POST",
  auth:"Anurag1:d19b775bef9ce6c082cbcff075f53d0e-us9"
}

const request= https.request(url,options,function(response){

if(response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
  response.on("data",function(data){
    // console.log(JSON.parse(data));

  })

})

request.write(jsonData);
request.end();

});

app.post("/failure.html",function(req, res){
  res.redirect("/");
})

app.post("/success.html",function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});



