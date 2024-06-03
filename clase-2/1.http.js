const http = require('node:http')
const fs = require('node:fs')

const port = process.env.PORT ?? 3000

const procesarRequest = (req,res)=>{
    res.setHeader('Content-type', 'text/html; charset=utf-8')
    res.statusCode = 200

    if(req.url == '/'){ 

        res.end('Bienvenido a mi pagina')
        
    }else if(req.url == '/imagen'){

        
        fs.readFile('./fotoCV.png', (err,data)=>{

            if(err){
                res.statusCode == 500
                res.end("Problema al leer la imagen")

            }else{

                res.setHeader('Content-type', 'image/png; charset=utf-8')
                res.end(data)
                
            }
        })




    }else if( req.url == '/contacto'){

        res.end("<h1>Contacto</h1>")

    }else{

        res.statusCode = 404
        res.end("<h1>tu pagina no ha sido encontrada: 404 </h1> ")

    }
}

const server = http.createServer(procesarRequest)

server.listen(port, ()=>{
    console.log("El servidor esta en el http://localhost:" + port);
})
