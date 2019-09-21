const path = require('path')
const express = require('express')
const hbs = require('hbs')
const req = require('request')
const weatherCode = require('./util/geoCode')
const app = express()
const port = process.env.PORT || 3000
console.log(path.join(__dirname,'..'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('/',(req,res,next)=>{
     weatherCode.geocode('columbus,ohio',(err,data)=>{

console.log(data)
        weatherCode.forcast(data.lat,data.lon,(error,data2)=>{
            res.render('index',{
                title:'Index',
                data:data2,
                place:data.place
            })
        },next)

     })

  

})
app.get('/weather',(req,res,next)=>{
    weatherCode.geocode(req.query.place,(err,data)=>{
if(err){
    next(err)
    res.status(404)
}
console.log(data)
       weatherCode.forcast(data.lat,data.lon,(error,data2)=>{
           if(error){
               next(error)
           }
           res.send({
               title:'weather',
               data:data2,
               place:data.place
           })
       },next)

    },next)
})

app.get('/forcast',(req,res,next)=>{
    
  
    res.render('Help',{
        title:'forcast'
    })
})

app.get('/About',(req,res,next)=>{
    
  
    res.render('About',{
        title:'About'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{title:'Wellcome to 404 Zoo'})
})


app.listen(port,()=>{
    console.log('the app is listening port 3000')
})