import fetchArtistMusicBrainzID from "../services/fetchArtistMusicBrainzID.js";

export async function getArtistMusicBrainzId(request, reply) {
    try {
        const ArtistMusicBrainzIDs = await fetchArtistMusicBrainzID();
        reply.send(ArtistMusicBrainzIDs);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}