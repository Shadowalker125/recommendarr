import {sprintf} from "sprintf-js";
import {API_PLAYLISTS, API_PLAYLIST, EXT_PLAYLIST, EXT_TRACK, TMPL_PLAYLIST, USERS, LISTS} from "../config/config.js";
import axios from "axios";

async function fetchData(url) {
    const resp = await axios.get(url);
    return resp.data;
}

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
        try {
            const ids = {};

            for (const user of USERS) {
                const listsResponse = await fetchData(sprintf(API_PLAYLISTS, user));
                const lists = listsResponse.playlists || [];

                for (const list of lists) {
                    const meta = list.playlist.extension[EXT_PLAYLIST];
                    const type = meta.additional_metadata.algorithm_metadata.source_patch;

                    if (!LISTS.includes(type)) continue;

                    const mbid = list.playlist.identifier.split('/').pop(); //Extract mbid
                    const songsResponse = await fetchData(sprintf(API_PLAYLIST, mbid));
                    const songs = songsResponse.playlist.track;

                    for (const song of songs) {
                        const meta = song.extension[EXT_TRACK];

                        for (const artist of meta.additional_metadata.artists) {
                            ids[artist.artist_mbid] = true;
                        }
                    }
                }
            }
            reply.send(Object.keys(ids).map(id => ({MusicBrainzId: id})));
        }catch (error) {
            reply.status(500).send({ error: error.message });
        }
    })
}

export default routes;