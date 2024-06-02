const net = require('node:net')


function buscarPuerto(puertoDeseado){
    return new Promise((resolve,reject) =>{
        const server = net.createServer()

        server.listen(puertoDeseado, () =>{
            const {port} = server.address()
            server.close(()=>{
                resolve(port)
            })
        })

        server.on('error',(err)=>{
            if(err.code == 'EADDRINUSE'){
                buscarPuerto(0).then(port => resolve(port))
            }else{
                reject(err)
            }
        })
    })
}
module.exports = {buscarPuerto}
