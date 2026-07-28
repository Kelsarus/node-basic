const jwt =  require('jsonwebtoken')

function verificarToken(req, res, next) {
    const token =  req.headers['authorization']

    if (!token) {
        return res.send('Token não encontrado!')
    }

    try {
        const decoded = jwt.verify(token, 'segredo')
        req.usuario = decoded
        next()
    } catch {
        return res.send('Token inválido.')
    }
}

module.exports = verificarToken