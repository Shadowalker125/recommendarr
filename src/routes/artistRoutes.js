import {getArtistMusicBrainzId} from "../controllers/artistController.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

async function artistRoutes(fastify, options) {
    fastify.get('/', getArtistMusicBrainzId);
}

export default artistRoutes;