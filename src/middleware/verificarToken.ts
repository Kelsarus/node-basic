import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no .env')
}

function verificarToken(req: Request, res: Response, next: NextFunction) {
    const token =  req.headers['authorization']

    if (!token) {
        return res.send('Token não encontrado!')
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET!)
        req.usuario = decoded
        next()
    } catch {
        return res.send('Token inválido.')
    }
}

export default verificarToken