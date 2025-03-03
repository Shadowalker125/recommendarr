import { sprintf } from "sprintf-js";
import { API_PLAYLISTS, API_PLAYLIST, EXT_PLAYLIST, EXT_TRACK, LISTS, USERS, validateEnv} from "../config/config.js";

// Fetch list of all Users generated playlists
async function getUserPlaylist(user, fetchData) {
    const response = await fetchData(sprintf(API_PLAYLISTS, user));
    return response?.playlists || [];
}

// Extracts the MusicBrainzID of each playlist
function extractMusicBrainzIDFromList(list) {
    const meta = list?.playlist?.extension?.[EXT_PLAYLIST];
    const type = meta?.additional_metadata?.algorithm_metadata?.source_patch;
    if (!LISTS.includes(type)) return null;

    return list?.playlist?.identifier?.split('/').pop();
}

// Extracts all tracks from all playlists
async function getTracksFromPlaylist(mbid, fetchData) {
    if (!mbid) return [];

    const response = await fetchData(sprintf(API_PLAYLIST, mbid));
    return response?.playlist?.track || [];
}

// Extracts the artist's MusicBrainzId from each track
function extractArtistIDsFromTracks(tracks) {
    const ids = new Set();

    for (const track of tracks) {
        const trackMeta = track?.extension?.[EXT_TRACK];
        const artists = trackMeta?.additional_metadata?.artists || [];

        for (const artist of artists) {
            if (artist.artist_mbid) {
                ids.add(artist.artist_mbid);
            }
        }
    }

    return ids;
}

// Map  artists ID's in JSON for export
export default async function fetchArtistMusicBrainzID(fetchData) {
    validateEnv();

    try {
        const artistIDs = new Set();

        for (const user of USERS) {
            const userLists = await getUserPlaylist(user, fetchData);

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