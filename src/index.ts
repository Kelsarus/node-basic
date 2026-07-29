import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import auth from './routes/auth'
import animesRoutes from './routes/animes'

const app = express()

app.use(express.json())
app.use(animesRoutes)
app.use(auth)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})