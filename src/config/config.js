import dotenv from 'dotenv';
dotenv.config();

let USERS = [];
let LISTS = [];

export function validateEnv() {
    if (!process.env.USERS || !process.env.LISTS) {
        throw new Error('Environment variables USERS and LISTS must be defined');
    }
    else {
        // Environment Variables
        USERS = process.env.USERS.split(',');
        LISTS = process.env.LISTS.split(',');
    }
}

// Environment Variables
export { USERS, LISTS };

// API Endpoints
export const API_PLAYLISTS = "https://api.listenbrainz.org/1/user/%s/playlists/createdfor";
export const API_PLAYLIST = "https://api.listenbrainz.org/1/playlist/%s";

// External helpers
export const EXT_PLAYLIST = "https://musicbrainz.org/doc/jspf#playlist";
export const EXT_TRACK = "https://musicbrainz.org/doc/jspf#track";

// Template
export const TMPL_PLAYLIST=  "https://listenbrainz.org/playlist/%s";