const request=require('request')



const forecast=(latitude,longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=63df7cc4c053f7c5f711e51263379a1e&query='+ latitude +','+ longitude

    request({url:url,json:true}, (err, res)=>{
        if(err){
            callback("Unable to connect to weather api",undefined)
        }else if(res.body.error){
            callback(res.body.error,undefined)
        }else{
            callback(undefined,
             res.body.current.weather_descriptions[0]+','+ 'it is currently '+res.body.current.temperature+'degrees out. '+'It feels like '+res.body.current.feelslike +' degrees Out there.'+'The Humidity is ' + res.body.current.humidity + '%'
                )
        }
    })


}


module.exports=forecast


    //
    // Goal: Create a reusable function for getting the forecast
    //
    // 1. Setup the "forecast" function in utils/forecast.js
    // 2. Require the function in app.js and call it as shown below
    // 3. The forecast function should have three potential calls to callback:
    //    - Low level error, pass string for error
    //    - Coordinate error, pass string for error
    //    - Success, pass forecast string for data (same format as from before)
