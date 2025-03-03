// export default is the command to export to the server.js file: 
export default async function routes(fastify, options) {
    const { db } = options;
    fastify.get('/users', async (request, reply) => {
        try {
            const users = db.prepare('SELECT * FROM users').all()
            reply.send(users)
        } catch (err) {
            reply.status(500).send({ error: err.message })
        }
    })
}