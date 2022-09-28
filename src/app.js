const path=require('path')
const express= require('express')
const hbs= require('hbs')
const forecast= require('./Uils/forecast')
const geocode= require('./Uils/geocode')

console.log(__dirname)
const app= express()


// // CUSOM VIEWS DORECTORY:
// const pathdir= path.join(__dirname, '../templates/views')


const publicdirec=path.join(__dirname,'../public')
const pathdir= path.join(__dirname, '/templates/views')
const partialspath= path.join(__dirname,'/templates/partials')
app.use(express.static(publicdirec))

app.set('view engine', 'hbs')
app.set('views', pathdir)
hbs.registerPartials(partialspath)

// app.get('/',(req, res)=>{
//     res.send('Hello World!')
//     res.writeHead()
// })

app.get('/',(req, res)=>{
        res.render('index', {
            title:'Weather ',
            name:'Abdullahi'
        })
    })
    


// app.get('/help', (req, res)=>{
//     // res.send('Help Page')
//     res.send({
//         name:'Abdullahi',
//         age:20
//     })
// })

// app.get('/about', (req, res)=>{
//     res.send('About Page')
//    res.send('<title>HTML</title>')
// })


app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'HELP PAGE',
        name:'Abdullahi'
    })
})

app.get('/about', (req, res)=>{
     res.render('About',{
        title: 'About',
        name:'Abdullahi'
     })
    })

// app.get('/weather', (req, res)=>{
//     // res.send('Weather Page')
//     res.send({
//         forecast:'32 degree',
//         location:'Nigeria'
//     })
// })


app.get('/weather',(req, res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'Please input an address'
        })
    }
        geocode(req.query.address,(error, {latitude, longitude,location}={})=>{
            if(error){
                return res.send({ error })
            }
            forecast(latitude, longitude, (err, forecastdata)=>{
                if(err){
                    return res.send({error})
                }
                    res.send({
                        forecast: forecastdata,
                        location,
                        address:req.query.address
                    })
            })
        })


    // }else{
    //     res.send({
    //         forecast:'32 degree',
    //         location:'Nigeria',
    //         Address: add
    //     })
   
})

app.get('/products',(req, res)=>{

    if(!req.query.search){
        return res.send({
            Error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req, res)=>{
    res.render("404",{
        title:'HELP ARTICLE PAGE',
        name:'Abdullahi',
        errorMessage:'Help Article not found'
    })
})


app.get('*', (req, res)=>{
    res.render("404",{
        title:'404 PAGE',
        name:'Abdullahi',
        errorMessage:'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server running on port 3000...')
})