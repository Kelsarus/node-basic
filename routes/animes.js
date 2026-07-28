const db = require('../database')
const express = require('express')
const router = express.Router()
const verificarToken = require('../middleware/auth')

router.post('/anime', verificarToken, (req, res) => {
    const { nome, episodios } =  req.body
    const stmt = db.prepare('INSERT INTO animes (nome, episodios) VALUES (?, ?)')
    stmt.run(nome, episodios)
    res.send('Anime cadastrado com sucesso.')
})

router.get('/procurar', verificarToken, (req, res) => { 
    const stmt = db.prepare('SELECT * FROM animes')
    const animes = stmt.all()
    res.send(animes)
})

router.delete('/deletar/:indice', verificarToken, (req, res) => {
    const indice = req.params.indice
    const stmt = db.prepare('DELETE FROM animes WHERE id = ?')
    stmt.run(indice)
    res.send('Anime deletado')
})

router.put('/atualizar/:indice', verificarToken, (req, res) => {
    const indice = req.params.indice
    const { nome, episodios } = req.body
    const stmt = db.prepare('UPDATE animes SET nome = ?, episodios = ? WHERE id = ?')
    stmt.run(nome, episodios, indice)
    res.send('Anime atualizado.')
})

module.exports = router