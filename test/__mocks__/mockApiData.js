export const mockUser = "Mr_Monkey";

export const mockPlaylistsResponse = {
    playlist: {
        extension: {
            "https://musicbrainz.org/doc/jspf#playlist": {
                created_for: "Mr_Monkey",
                creator: "troi-bot",
                collaborators: ["rob", "alastairp", "zas"],
                copied_from: "https://listenbrainz.org/playlist/9dae92c5-c98e-4e7e-9c15-8b6d32607aed",
                copied_from_deleted: true,
                public: true,
                last_modified_at: "2020-11-27T10:45:49+00:00",
                additional_metadata: {
                    // Add any additional mock metadata if needed
                },
            },
        },
        creator: "ListenBrainz Troi",
        date: "2005-01-08T17:10:47-05:00",
        title: "1980s flashback jams",
        track: [
            {
                title: "Gold",
                identifier: "https://musicbrainz.org/recording/e8f9b188-f819-4e43-ab0f-4bd26ce9ff56",
                creator: "Spandau Ballet",
                extension: {
                    "https://musicbrainz.org/doc/jspf#track": {
                        added_by: "zas",
                        artist_identifiers: [
                            "https://musicbrainz.org/artist/4c0d9acf-a8a1-4765-9c56-05f92f68c048",
                        ],
                        added_at: "2020-11-27T10:45:49+00:00",
                        release_identifier: "https://musicbrainz.org/release/8d3acbb4-c541-4324-a124-a670615f0f77",
                        additional_metadata: {
                            subsonic_id: "e66f7f91-2884-4cdf-97b3-24faee6be03e",
                        },
                    },
                },
                album: "True",
            },
        ],
        identifier: "https://listenbrainz.org/playlist/7f4cf4d3-f5ca-453a-b5c8-00e8a30a9bac",
    },
};

export const mockPlaylistTracksResponse = {
    playlist: {
        track: [
            {
                extension: {
                    "https://musicbrainz.org/doc/jspf#track": {
                        additional_metadata: {
                            artists: [{ artist_mbid: "abc123" }],
                        },
                    },
                },
            },
        ],
    },
};
