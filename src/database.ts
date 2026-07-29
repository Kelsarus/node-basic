import Database from 'better-sqlite3'

const db = new Database('animes.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS animes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        episodios INTEGER
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        senha TEXT)
    `)

console.log('Banco de dados conectado!')

export default db