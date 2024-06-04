const express = require('express')
const dittoJson = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

const PORT = 3000

app.use(express.json())
// app.use((req,res, next)=>{

//     if(req.method !== 'POST') return next()
//     if(req.headers['content-type'] !== 'application/json') return next()
    
    
//     let body = ''    

//     req.on('data', chunk => {

//         body += chunk.toString()
//     })
    
//     req.on('end', ()=>{
//         const data = JSON.parse(body)
//         data.timestamp = Date.now()
//         req.body = data
//         next()
//     })

// })

app.get('/',(req,res)=>{

    res.json({mesaje: "hola amigo"})

})

app.get('/pokemon/ditto', (req,res)=>{

    res.json(dittoJson)
})

app.post('/pokemon',(req,res)=>{
    //guardar en base de datos
    res.status(201).json(req.body)
})

app.use((req,res)=>{
    res.status(404).send("<h1>Lo siento pero te has equivocado de ruta</h1>")
})


app.listen(PORT,()=>{
    console.log("El servidor esta en el http://localhost:" + PORT);
})