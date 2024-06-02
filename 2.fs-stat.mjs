import fs from 'node:fs'

const stats = fs.statSync('./archivofs.txt')


console.log(stats.isFile() , stats.isDirectory() , stats.isSymbolicLink() , stats.size);
