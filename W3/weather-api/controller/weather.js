'use strict';
const weather = require('openweather-node');
const bodyparser = require('body-parser');

let jsonParser = bodyparser.json();

process.env.ID_WEATHER = "23825da08eafcadf1597630777e29b5c";

weather.setAPPID(process.env.ID_WEATHER);

const weatherP = (city)=> new Promise((resolve, reject)=>{
    weather.now(city,function(err, data)
    {	
        if(err) return reject(err);
        resolve(data);
       /* else
        {
           temp = JSON.stringify(aData.getKelvinTemp()['temp']);
           inf.temperature = temp;
           res.send(inf);*/
           // console.log(aData.getKelvinTemp())
            //console.log(aData.getDegreeTemp())
            //console.log(aData.getFahrenheitTemp())
        //}
    })
});
    
function getWeatherByTemp(temp,data){
    switch(temp.toLowerCase()){
        case 'kelivn':
            return data.getKelvinTemp();
            
    }
}

module.exports = function(app){

    app.post(/\/api\/Weather$/,jsonParser,function(req,res){

        if(!req.body || req.body.length === 0){
            console.log('request body not found');
            return res.sendStatus(400);
        }
        let city = req.body.city;
        weatherP(city)
        .then((data)=>{
          res.send({
              weather: data.getKelvinTemp(),
              city
          })  
        });
        let inf = req.body;
      
        var temp = '';
       
        //console.log(req.body.city);
    });

    app.listen(3000,function(){
        console.log('Running on port 3000');
    })
}