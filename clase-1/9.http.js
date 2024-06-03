const http = require('node:http')
const {buscarPuerto} = require('./10.free-port.js')

const port = process.env.PORT ?? 3000

const server = http.createServer((req,res)=>{
    console.log('request received');
    res.end("hola mundo")
})

buscarPuerto(port).then(port=>{

    server.listen(port, ()=>{
        console.log("El servidor esta en el http://localhost:" + port);
    })
})
