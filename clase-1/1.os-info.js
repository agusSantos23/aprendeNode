const os = require('node:os')

console.log(os.platform())
console.log(os.release())
console.log(os.uptime()/60/60)