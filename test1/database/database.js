import fp from 'fastify-plugin'
import Database from 'better-sqlite3'

// create database plugin to be able to control when it's loaded
async function databasePlugin(fastify, options) {
    const db = new Database('./database/database.sqlite')
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL)`
    ).run()
    
    fastify.decorate('db', db)
} 
        
// Export database so that server.js and route files can use it: 
export default fp(databasePlugin)

