const axios = require('axios');
const fastify = require('fastify')({ logger: true});
const {sprintf} = require('sprintf-js');
require('dotenv').config();

const API_PLAYLISTS = "https://api.listenbrainz.org/1/user/%s/playlists/createdfor";
const API_PLAYLIST = "https://api.listenbrainz.org/1/playlist/%s";

const EXT_PLAYLIST = "https://musicbrainz.org/doc/jspf#playlist";
const EXT_TRACK = "https://musicbrainz.org/doc/jspf#track";

const TMPL_PLAYLIST = "https://listenbrainz.org/playlist/%s";

const USERS = process.env.USERS ? process.env.USERS.split(',') : [];
const LISTS = process.env.LISTS ? process.env.LISTS.split(',') : [];

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
        reply.send(Object.keys(ids).map(id => ({MusicBrainzID: id})));
    }catch (error) {
        reply.status(500).send({ error: error.message });
    }   
});

async function fetchData(url) {
    const response = await axios.get(url);
    return response.data;
}

//Start Server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0'});
        fastify.log.info('Server is running on http://localhost:3000')
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();