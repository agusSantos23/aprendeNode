const express = require('express')
const movies = require('./movies.json')
const crypto  = require('node:crypto')
const { validacionMovie, validacionPartialMovie } = require('./schemas/movieShemas')

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.get('/movies',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')
    const {genre} = req.query
    if(genre){
        const filterMovies = movies.filter(movie => movie.genre.includes(genre))
        return res.json(filterMovies)
    }


    res.json(movies)
})


app.get('/movies/:id',(req,res) =>{
    const {id} = req.params
    const movie = movies.find(movie=> movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({mensaje:"NO ha sido encontrada: 404"})
})



app.post('/movies',(req, res)=>{
    
    const result = validacionMovie(req.body)
    if(result.error){
        return res.status(400).json({error: result.error.issues})
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)

})

app.delete('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')

    const {id} = req.params

    const movieIndex = movies.findIndex(movie => movie.id == id)

    if(movieIndex == -1){
        return res.status(404).json({message:"Movie not found"})
    }

    movies.splice(movieIndex, 1)
    return res.json({message: 'Movie deleted'})
})


app.patch('/movies/:id', (req,res)=>{
    const {id} = req.params
    const result = validacionPartialMovie(req.body)
    if(result.error) return res.status(400).json({error: result.error.issues})

    const movieIndex = movies.findIndex(movie=> movie.id === id)
    if(movieIndex == -1) return res.status(404).json({error:"La pelicula no ha sido encontrada"})

    const updateMovie ={
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)

})

app.options('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')

    res.send()
})

const port = process.env.PORT ?? 3000

app.listen(port, ()=>{
    console.log(`El servidor esta en el http://localhost:${port}`);

})



