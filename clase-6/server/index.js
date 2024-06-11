import express from 'express'
import logger from 'morgan'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import dotenv from 'dotenv'
import {createClient} from '@libsql/client'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server,{
    connectionStateRecovery:{}
})

const db = createClient({
    url:"libsql://crack-night-thrasher-agussantos23.turso.io",
    autoToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    )
    `)


io.on('connection',(socket)=>{
    console.log('user has connected')
    
    socket.on('disconnect', ()=>{
        console.log('usuario has disconnected');
    })

    socket.on('chat message', async (msg)=>{

        let result
        try{
            result = await db.execute({
                sql: `INSERT INTO messages (content) VALUES (:msg)`,
                args: {msg}
            })
        }catch(e){
            console.error(e)
            return
        }

        io.emit('chat message', result.lastInsertRowid.toString())
    })
    
})



app.use(logger('dev'))

app.get('/',(req,res)=>{
    res.sendFile(process.cwd()+ '/client/index.html')

})


server.listen(port,()=>{
    console.log(`Server a sido levantado en el puerto ${port}`)
})