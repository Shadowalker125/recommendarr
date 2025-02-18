import dotenv from 'dotenv';
dotenv.config();

export function validateEnv() {
    if (!process.env.USERS || !process.env.LISTS) {
        throw new Error('Environment variables USERS and LISTS must be defined');
    }
}

//Run validation at import
validateEnv();

// API Endpoints
export const API_PLAYLISTS = "https://api.listenbrainz.org/1/user/%s/playlists/createdfor";
export const API_PLAYLIST = "https://api.listenbrainz.org/1/playlist/%s";

// External helpers
export const EXT_PLAYLIST = "https://musicbrainz.org/doc/jspf#playlist";
export const EXT_TRACK = "https://musicbrainz.org/doc/jspf#track";

// Template
export const TMPL_PLAYLIST=  "https://listenbrainz.org/playlist/%s";

// Environment Variables
export const USERS = process.env.USERS.split(',');
export const LISTS = process.env.LISTS.split(',');