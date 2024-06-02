import { readFile } from 'node:fs/promises'


Promise.all([
    readFile("./archivofs.txt", 'utf-8'),
    readFile('./archivo2.txt','utf-8')
])
    .then(([text,text2])=>{
        console.log(text)
        console.log(text2)
    })
