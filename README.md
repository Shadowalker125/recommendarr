
# Recommendarr

*Name (WIP)*

This is a very simple app that querys ListenBrainz API for a users generated playlists. This allows a way for someone who has connected spotify, last.fm, apple music, soundcloud, and/or youtube to listenbrainz to grab artist information from these generated playlists and spit out a JSON object of all the artists MusicBrainz ID's.

This allows, for example, someone to then point Lidarr to the URL using the custom list import and have these artists automatically added to their library.

> [!IMPORTANT]  
> This script will not work with lidarr until [this PR](https://github.com/Lidarr/Lidarr/pull/5399) is live


## Installation

At the moment, this isnt containerized and requires node.js


## Environment Variables

To run this project, you will need to update the following environment variables to your .env file

`USER`

`LISTS`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Shadowalker125/recommendarr.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Usage/Examples

spits out JSON object on localhost:3000

```json
[{"MusicBrainzId":"41656317-c512-456f-9fe7-1f7fb8482a34"},
{"MusicBrainzId":"8ccd44fb-1c4a-4c5f-98b5-cf3b35a2aa5c"},
{"MusicBrainzId":"04473ad7-3aed-4e8f-bd7f-b64784263560"},
{"MusicBrainzId":"295c7990-1fe6-4135-b748-c30717b7fff8"}]
```

