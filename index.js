const express = require('express')
const auth = require('./routes/auth')

const app = express()
const animesRoutes = require('./routes/animes')

app.use(express.json())
app.use(animesRoutes)
app.use(auth)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})