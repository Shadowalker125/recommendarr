import fetchArtistMusicBrainzID from "../services/fetchArtistMusicBrainzID.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

async function routes(fastify, options) {
    fastify.get('/',async (request, reply) => {
        try {
            const ArtistMusicBrainzIDs = await fetchArtistMusicBrainzID();
            reply.send(ArtistMusicBrainzIDs);
        } catch (error) {
            reply.status(500).send({ error: error.message });
        }
    })
}

export default routes;