import { Router } from "express"
import { randomUUID } from 'node:crypto'
import { validacionMovie, validacionPartialMovie } from './schemas/movieShemas.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const movies = require("./movies.json")

export const moviesRouter = Router()

moviesRouter.get('/',(req,res)=>{
    const {genre} = req.query
    if(genre){
        const filterMovies = movies.filter(movie => movie.genre.includes(genre))
        return res.json(filterMovies)
    }


    res.json(movies)
})

moviesRouter.get('/:id',(req,res) =>{
    const {id} = req.params
    const movie = movies.find(movie=> movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({mensaje:"NO ha sido encontrada: 404"})
})

moviesRouter.post('/',(req, res)=>{
    
    const result = validacionMovie(req.body)
    if(result.error){
        return res.status(400).json({error: result.error.issues})
    }

    const newMovie = {
        id: randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)

})

moviesRouter.delete('/:id',(req,res)=>{

    const {id} = req.params

    const movieIndex = movies.findIndex(movie => movie.id == id)

    if(movieIndex == -1){
        return res.status(404).json({message:"Movie not found"})
    }

    movies.splice(movieIndex, 1)
    return res.json({message: 'Movie deleted'})
})


moviesRouter.patch('/:id', (req,res)=>{
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

moviesRouter.options('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')

    res.send()
})
