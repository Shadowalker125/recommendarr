import { describe, it, expect, beforeEach, afterEach} from "vitest";
import { validateEnv } from "@src/config/config.js";

let envMock;

beforeEach(() => {
    envMock = vi.spyOn(process, "env", "get").mockReturnValue({});
});

afterEach(() => {
    envMock.mockRestore();
});

describe("Environment variables Check", () => {
    it("should throw an error if USERS or LISTS is missing", () => {
        envMock.mockReturnValue({});
        expect(() => validateEnv(envMock)).toThrowError(
            "Environment variables USERS and LISTS must be defined"
        );
    })

    it("should NOT throw an error if USERS or LISTS are defined", () => {
        envMock.mockReturnValue({ USERS: "test_user", LISTS: "test_lists" });
        expect(() => validateEnv()).not.toThrowError();
    });
});