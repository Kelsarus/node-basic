const db = require('../database')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/registro', async (req, res) => {
    const { email, senha } =  req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const stmt =  db.prepare('INSERT INTO usuarios (email, senha) VALUES (?, ?)')
    stmt.run(email, senhaCriptografada)
    res.send('Registrado com sucesso.')
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

    const token = jwt.sign({ id: usuario.id }, 'segredo', { expiresIn: '1d' })
    res.send(({ token }))
})

module.exports = router