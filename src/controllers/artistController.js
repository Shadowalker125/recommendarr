import fetchArtistMusicBrainzID from "../services/fetchArtistMusicBrainzID.js";
import fetchData from "../services/fetchData.js";
import {validateEnv} from "../config/config.js";

export async function getArtistMusicBrainzId(request, reply) {
    validateEnv();
    try {
        const ArtistMusicBrainzIDs = await fetchArtistMusicBrainzID(fetchData);
        reply.send(ArtistMusicBrainzIDs);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}