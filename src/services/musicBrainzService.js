import { sprintf } from "sprintf-js";
import { API_PLAYLIST, API_PLAYLISTS, EXT_PLAYLIST, EXT_TRACK, LISTS } from "../config/config.js";

// Fetch list of all Users generated playlists
export async function getUserPlaylists(user, fetchData) {
    const response = await fetchData(sprintf(API_PLAYLISTS, user));
    return response?.playlists || [];
}

// Extracts the MusicBrainzID of each playlist
export function extractMusicBrainzIDFromList(list) {
    const meta = list?.playlist?.extension?.[EXT_PLAYLIST];
    const type = meta?.additional_metadata?.algorithm_metadata?.source_patch;
    if (!LISTS.includes(type)) return null;

    return list?.playlist?.identifier?.split('/').pop();
}

// Extracts all tracks from all playlists
export async function getTracksFromPlaylist(mbid, fetchData) {
    if (!mbid) return [];

    const response = await fetchData(sprintf(API_PLAYLIST, mbid));
    return response?.playlist?.track || [];
}

// Extracts the artist's MusicBrainzId from each track
export function extractArtistIDsFromTracks(tracks) {
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