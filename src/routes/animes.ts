import db from '../database'
import express, { Router, Request, Response } from 'express'
import verificarToken from '../middleware/verificarToken'
const router = express.Router()

router.post('/anime', verificarToken, (req: Request, res: Response) => {
    const { nome, episodios } =  req.body
    const stmt = db.prepare('INSERT INTO animes (nome, episodios) VALUES (?, ?)')
    stmt.run(nome, episodios)
    res.send('Anime cadastrado com sucesso.')
})

router.get('/procurar', verificarToken, (req: Request, res: Response) => { 
    const stmt = db.prepare('SELECT * FROM animes')
    const animes = stmt.all()
    res.send(animes)
})

router.delete('/deletar/:indice', verificarToken, (req: Request, res: Response) => {
    const indice = req.params.indice
    const stmt = db.prepare('DELETE FROM animes WHERE id = ?')
    stmt.run(indice)
    res.send('Anime deletado')
})

router.put('/atualizar/:indice', verificarToken, (req: Request, res: Response) => {
    const indice = req.params.indice
    const { nome, episodios } = req.body
    const stmt = db.prepare('UPDATE animes SET nome = ?, episodios = ? WHERE id = ?')
    stmt.run(nome, episodios, indice)
    res.send('Anime atualizado.')
})

export default router