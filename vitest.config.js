import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
    },
    resolve: {
        alias: {
            '@src': new URL('/src', import.meta.url).pathname,
        },
    },
});
