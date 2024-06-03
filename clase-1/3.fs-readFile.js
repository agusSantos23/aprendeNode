const fs = require('node:fs')

console.log("Leyendo el primer archivo")
fs.readFile("./archivofs.txt", 'utf-8', (err, text) =>{

    console.log("Primero:",text)

})



console.log("Leyendo el segundo archivo")

fs.readFile('./archivo2.txt','utf-8', (err, text) =>{
    
    console.log("Primero:",text)

})


