const db = require('../database')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

const registroSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
})

router.post('/registro', async (req, res) => {
    const { email, senha } =  req.body
    const resultado = registroSchema.safeParse(req.body)

    if (!resultado.success) {
        return res.json(resultado.error.issues)
    }
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const stmt =  db.prepare('INSERT INTO usuarios (email, senha) VALUES (?, ?)')
        stmt.run(email, senhaCriptografada)
        res.send('Email registrado!')
    }
    catch {
        res.send('Email já cadastrado.')
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const stmt = db.prepare('SELECT * FROM usuarios WHERE email = ?')
    const usuario = stmt.get(email)

    if (!usuario) {
        return res.send('Email não encontrado.')
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
            return res.send('Senha incorreta.')
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.send(({ token }))
})

module.exports = router