import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'


const app = express()
app.use(json())
app.use((req,res) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    
})
app.disable('x-powered-by')

app.use('/movies', moviesRouter)


const port = process.env.PORT ?? 3022

app.listen(port, ()=>{
    console.log(`El servidor esta en el http://localhost:${port}`);

})



