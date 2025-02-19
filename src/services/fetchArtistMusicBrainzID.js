import {sprintf} from "sprintf-js";
import {API_PLAYLIST, API_PLAYLISTS, EXT_PLAYLIST, EXT_TRACK, LISTS, USERS, validateEnv} from "../config/config.js";
import fetchData from "./fetchData.js";

export default async function fetchArtistMusicBrainzID() {
    validateEnv();
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
        return Object.keys(ids).map(id => ({MusicBrainzID: id}))
    } catch (error) {{
        throw new Error(`Error fetching MusicBrainzID: ${error.message}`);
    }}
}