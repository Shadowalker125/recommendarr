import {getArtistMusicBrainzId} from "../controllers/artistController.js";

async function artistRoutes(fastify) {
    fastify.get('/', getArtistMusicBrainzId);
}

export default artistRoutes;