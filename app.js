const express = require('express');
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
    console.log("got");
})
app.post("/",(req,res)=>{
    let firstname = req.body.fname;
    let secondname = req.body.sname;
    let email = req.body.eml;
    console.log(firstname+"\n"+secondname+"\n"+email);
    // console.log(fname)
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: secondname
                }

            }
        ]
    }
    url = "https://us14.api.mailchimp.com/3.0/lists/627346bb6c"
    const jsondata = JSON.stringify(data);
    const options ={
        method:"POST",
        auth:"Puneet1:7e8f5ad297891d03c35765a2d54a395f-us14"
    }
    const request = https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT ||3000 ,()=>{
    console.log("Server is running");
})
//apikey
//7e8f5ad297891d03c35765a2d54a395f-us14
// audince Id
// 627346bb6c