import prisma from '../prisma'
import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no .env')
}

const registroSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
})

router.post('/registro', async (req: Request, res: Response) => {
    const { email, senha } =  req.body
    const resultado = registroSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.json(resultado.error.issues)
    }
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        await prisma.usuario.create({
            data: { email, senha: senhaCriptografada}
        })
        res.send('Email registrado!')
    }
    catch {
        res.send('Email já cadastrado.')
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    })

    if (!usuario) {
        return res.send('Email não encontrado.')
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
            return res.send('Senha incorreta.')
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1d' })
    res.send(({ token }))
})

export default router