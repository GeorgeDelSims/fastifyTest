import Database from 'better-sqlite3'

// create database.sqlite file: 
const db = new Database('./database/database.sqlite')

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL)`
).run()

// Export database so that server.js and route files can use it: 
export default db
