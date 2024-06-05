import express, { json } from 'express'
import { moviesRouter } from './routes/movies'
import { corsMiddlware } from './middlewares/cors' 


const app = express()
app.use(json())
app.use(corsMiddlware())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)


const port = process.env.PORT ?? 3000

app.listen(port, ()=>{
    console.log(`El servidor esta en el http://localhost:${port}`);

})



