const request= require("request")


const geoCode=(address, callback)=>{
    const geocodeUR='http://api.positionstack.com/v1/forward?access_key=5f71263dc08c8879cbbdb42de1c8cfe2&query='+address
  
  
    request({url:geocodeUR, json:true},(err, res)=>{
  
      if(err){
        callback('Unable to connect to location services',undefined)
      }else if(res.body.error){
        callback('Unable to find location, Try another search',undefined)
      }else{
        callback(undefined,{
          latitude:res.body.data[0].latitude,
          longitude:res.body.data[0].longitude,
          location:res.body.data[0].name
        })
      }
  
    })
  }
  
 

  module.exports=geoCode