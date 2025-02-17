import dotenv from 'dotenv';
dotenv.config();

if (!process.env.USERS || !process.env.LISTS) {
    throw new Error('Environment variables USERS and LISTS must be defined');
}


export const API_PLAYLISTS = "https://api.listenbrainz.org/1/user/%s/playlists/createdfor";
export const API_PLAYLIST = "https://api.listenbrainz.org/1/playlist/%s";
export const EXT_PLAYLIST = "https://musicbrainz.org/doc/jspf#playlist";
export const EXT_TRACK = "https://musicbrainz.org/doc/jspf#track";
export const TMPL_PLAYLIST=  "https://listenbrainz.org/playlist/%s";
export const USERS = process.env.USERS ? process.env.USERS.split(',') : [];
export const LISTS = process.env.LISTS ? process.env.LISTS.split(',') : [];