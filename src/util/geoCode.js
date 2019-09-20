var request = require('request');


module.exports.forcast = (lat,lon, callback,next)=>{
    let url = 'https://api.darksky.net/forecast/a0724462f9fbe0c10e6ebe7974dc05c7/'+lat+','+lon
    request({url:url, json:true}, (error, response)=>{
        if(error){
            next(error)
            callback('try another search',undefined)
        }else{
        callback(undefined,{
            temperature:response.body.currently.temperature,
            windGust: response.body.currently.windGust
        })
    }

    });

}
module.exports.geocode = function(address,callback){
let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYmFzaGlpciIsImEiOiJjazBlbGkwYTQwamVuM2JuNTkxNGZydGkwIn0.tkGKPzjiBZeNbNqMlSlOIQ'
request({url:url, json:true}, (error, response,next)=>{
    if(error){
        next(error)
        callback('mapbox canot find this place ',undefined)
    }else{
        console.log(error)
        if(response.body.features.length>0)
    callback(undefined,{
        place:response.body.features[0].place_name,
        lat:response.body.features[0].center[1],
        lon: response.body.features[0].center[0]
    })
}

});
}




//https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoiYmFzaGlpciIsImEiOiJjazBlbGkwYTQwamVuM2JuNTkxNGZydGkwIn0.tkGKPzjiBZeNbNqMlSlOIQ