import prisma from '../prisma'
import express, { Router, Request, Response } from 'express'
import verificarToken from '../middleware/verificarToken'
const router = express.Router()

router.post('/anime', verificarToken, async (req: Request, res: Response) => {
    const { nome, episodios } =  req.body
    await prisma.anime.create({
        data: { nome, episodios }
    })
    res.send('Anime cadastrado com sucesso.')
})

router.get('/procurar', verificarToken, async (req: Request, res: Response) => { 
    const animes = await prisma.anime.findMany()
    res.send(animes)
})

router.delete('/deletar/:indice', verificarToken, async (req: Request, res: Response) => {
    const indice = req.params.indice
    await prisma.anime.delete({
        where: { id: Number(indice)}
    })
    res.send('Anime deletado')
})

router.put('/atualizar/:indice', verificarToken, async (req: Request, res: Response) => {
    const indice = req.params.indice
    const { nome, episodios } = req.body
    await prisma.anime.update({
        where: { id: Number(indice)},
        data: { nome, episodios }
    })
    res.send('Anime atualizado.')
})

export default router