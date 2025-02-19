>[!CAUTION]
>If left unchecked, this script will add an enormously large amount of music to a lidarr instance, as this pulls the ARTIST id and lidarr will then proceed to monitor the ENTIRE artist discography. You have been warned.


# Recommendarr

*Name (WIP)*

This is a very simple app that queries ListenBrainz API for a users generated playlists. This allows a way for someone who has connected spotify, last.fm, apple music, soundcloud, and/or youtube to listenbrainz to grab artist information from these generated playlists and spit out a JSON object of all the artists MusicBrainz ID's.

This allows, for example, someone to then point Lidarr to the URL using the custom list import and have these artists automatically added to their library.

>[!TIP]
>Plexamp can be used aswell, you just have to link it to last.fm first, then link last.fm to listenbrainz. https://plex.tv/users/other-services

> [!IMPORTANT]  
> This script will not work with lidarr until [this PR](https://github.com/Lidarr/Lidarr/pull/5399) is live


## Installation

### unRaid community apps
*soon*

### docker-compose

```yaml
services:
  server:
    image: ghcr.io/shadowalker125/recommendarr:latest
    container_name: recommendarr
    environment:
      PUID: 1000
      PGID: 1000
      NODE_ENV: production
      USERS: ""
      LISTS: ""
    ports:
      - "4500:4500"
```


## Environment Variables

To run this project, you will need to update the following environment variables to your .env file

Users is an array of any Listenbrainz usernames: 

`USERS`

Lists is any of the created lists in listenbrainz. "weekly-exploration" is the recommended one

`LISTS`

## Usage/Examples

To use with Lidarr, open Settings > Import Lists > Add List > Custom List

Change settings to your liking regarding monitoring, quality profile, etc...

For the List URL, simply add the url and port '4500' for the running instance of recommendarr 

ex: 'http://localhost:4500'

spits out JSON object

```json
[{"MusicBrainzId":"41656317-c512-456f-9fe7-1f7fb8482a34"},
{"MusicBrainzId":"8ccd44fb-1c4a-4c5f-98b5-cf3b35a2aa5c"},
{"MusicBrainzId":"04473ad7-3aed-4e8f-bd7f-b64784263560"},
{"MusicBrainzId":"295c7990-1fe6-4135-b748-c30717b7fff8"}]
```

