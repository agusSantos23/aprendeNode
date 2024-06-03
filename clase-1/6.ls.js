const fs = require('node:fs')

fs.readdir('.',(err,files)=>{
    if(err){
        console.log(err)
        return
    }

    files.forEach(files => {
        console.log(files)
    })
})