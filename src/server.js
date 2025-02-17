import Fastify from 'fastify'
import artistRoutes from './routes/artistRoutes.js'
/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
    logger: true
})

fastify.register(artistRoutes)

const start = async () => {
    try {
        await fastify.listen({ port: 4500, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();