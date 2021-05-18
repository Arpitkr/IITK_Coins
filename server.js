//roll is an object containing dummy data.
//server is created in nodejs.

var roll = {
    "200190" : "1000",
    "180199" : "1000000",
    "200001" : "50",
    "200002" : "100"
};
var http= require('http');
var url = require('url');
var f= function(req,res){
    var reqUrl = url.parse(req.url);
    if(req.method == "POST" && reqUrl.pathname=="/coins")
    {
        var body=' ';
        var post="";
        req.on('data',function(chunk){
            body+=chunk;
        });
        req.on('end',()=>{
            post = JSON.parse(body);
            var flag=0;
            var coin="";
            for(i in roll)
            {
                if(i==post["rollno"])
                    {
                        coin = roll[i];
                        flag=1;
                        break;
                    }
            }
            if(flag==1)
            {
                coin = parseInt(coin);
                var Data ={"coins" : coin};
                res.statusCode=200;
                res.setHeader('Content-type','application/json');
                res.write(JSON.stringify(Data));
                res.end();
            }
            else{
                //If roll not found
                res.write("The required roll number does not exist in database");
                res.end();
            }
        })
    }
    else if(reqUrl.pathname!="/coins"){
        res.statusCode=404;
        res.end("Invalid Request. Pathname "+reqUrl.pathname+" not found! Try accessing '/coins'");
    }
    else if(req.method!="POST")
    {
        res.statusCode=200;
        res.end("Try using POST method");
    }
}
http.createServer(f).listen(8080);