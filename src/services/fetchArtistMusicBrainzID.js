import { EXT_PLAYLIST, LISTS, USERS } from "../config/config.js";
import {
    extractArtistIDsFromTracks,
    extractMusicBrainzIDFromList,
    getTracksFromPlaylist,
    getUserPlaylists
} from "./musicBrainzService.js";

// Map  artists ID's in JSON for export
export default async function fetchArtistMusicBrainzID(fetchData) {
    try {
        const artistIDs = new Set();

        for (const user of USERS) {
            const userLists = await getUserPlaylists(user, fetchData);

            for (const validList of LISTS) {
                const list = userLists.find(L => {
                    const meta = L?.playlist?.extension?.[EXT_PLAYLIST];
                    return meta?.additional_metadata?.algorithm_metadata?.source_patch === validList;
                });

                const mbid = extractMusicBrainzIDFromList(list);
                const tracks = await getTracksFromPlaylist(mbid, fetchData);
                const ids = extractArtistIDsFromTracks(tracks);

                if (ids && ids.size > 0) {
                    ids.forEach(id => artistIDs.add(id));
                }
            }
        }

        return [...artistIDs].map(id => ({ MusicBrainzID: id }));
    } catch (error) {
        throw new Error(`Error fetching MusicBrainzID: ${error.message}`);
    }
}