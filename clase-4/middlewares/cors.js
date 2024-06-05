export const corsMiddlware = () =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    
}