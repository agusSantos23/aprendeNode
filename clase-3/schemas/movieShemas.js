const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "El nombre deve de ser un String",
        required_error: "Se necesita el campo nombre"
    }),
    year: z.number().int().positive(),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: "Deve de ser una url"
    }),
    genre: z.array(z.enum(['Action','Adventure','Comedy','Drama', 'Fantasy']),{
        required_error:'Se requiere de un genero',
        invalid_type_error: 'El genero de la pelicula debe de ser un array'
    })
})

function validacionMovie(input){
    return movieSchema.safeParse(input)
}

function validacionPartialMovie(input){
    return movieSchema.partial().safeParse(input)
}

module.exports = {
    validacionMovie,
    validacionPartialMovie
}