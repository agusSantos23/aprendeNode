import { readFile } from 'node:fs/promises'

console.log("Leyendo el primer archivo")
const text = await readFile("./archivofs.txt", 'utf-8')
console.log(text)


console.log("Leyendo el segundo archivo")

const text2 = await readFile('./archivo2.txt','utf-8')
console.log(text2)
