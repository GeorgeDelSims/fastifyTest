// ESM
import Fastify from 'fastify'
import databasePlugin from './database/database.js'
import firstRoute from './routes/firstRoute.js'
import usersRoutes from './routes/usersRoutes.js'

const   fastify = Fastify({ logger: true })

// Register API routes (with db if the route needs to interact with sqlite)
fastify.register(databasePlugin)
fastify.register(firstRoute)
fastify.register(usersRoutes)

// Run the server:
fastify.listen({ port: 3000, host: '127.0.0.1' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server running at ${address}`)
})
