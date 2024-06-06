import { MovieModel } from "../models/movie.js"

export class MovieController{

    static async getAll (req,res){
        
        const {genre} = req.query
        const movies = await MovieModel.getAll({genre})
        res.json(movies)  
    }

    static async getById (req,res){
        const {id} = req.params
        const movie = await MovieModel.getById({id})
        if(movie) return res.json(movie)
        res.status(404).json({mensaje:"NO ha sido encontrada: 404"})
    }

    static async create (req, res){
    
        const result = validacionMovie(req.body)
        if(result.error){
            return res.status(400).json({error: result.error.issues})
        }
    
        const newMovie = await MovieModel.create({input: result.data})
    
        res.status(201).json(newMovie)
    
    }

    static async delete (req,res){

        const {id} = req.params
        const result = await MovieModel.delete({id})
    
        if(result == false){
            return res.status(404).json({message:"Movie not found"})
        }
    
        movies.splice(result, 1)
    
        return res.json({message: 'Movie deleted'})
    }

    static async update (req,res){
        const {id} = req.params
        const result = validacionPartialMovie(req.body)
        if(result.error) return res.status(400).json({error: result.error.issues})
    
        const updatedMovie = await MovieModel.update({id,input: result.data})
    
        return res.json(updatedMovie)
    
    }


}