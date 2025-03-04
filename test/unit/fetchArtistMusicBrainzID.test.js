import { describe, test, expect, vi } from "vitest";
import fetchArtistMusicBrainzID from "@src/services/fetchArtistMusicBrainzID.js";
import fetchData from "@src/services/fetchData.js";

// Mock `fetchData` to return predefined mock data
vi.mock("@src/services/fetchData.js", () => ({
    default: vi.fn(),
}));

// Mock `validateEnv` to prevent env-related errors
vi.mock("@src/config/config.js", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        validateEnv: vi.fn(), // Replace validateEnv with a no-op function
    };
});

describe("fetchArtistMusicBrainzID", () => {
    test("should return unique MusicBrainz artist IDs from mock data", async () => {

    });

    test("should handle empty playlists", async () => {
        fetchData.mockResolvedValueOnce({ playlists: [] });

        const result = await fetchArtistMusicBrainzID();
        expect(result).toEqual([]);
    });

    test("should throw an error if fetchData fails", async () => {

    });
});
