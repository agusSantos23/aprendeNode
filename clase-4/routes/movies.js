import { Router } from "express"
import { MovieController } from "../controllers/movies.js"


export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll )

moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)


moviesRouter.patch('/:id', MovieController.update )

moviesRouter.options('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin', '*')

    res.send()
})
