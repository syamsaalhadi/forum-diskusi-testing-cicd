import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Prevent Vite's file watcher from treating Cypress' own runtime
    // artifacts (screenshots/downloads/videos) as source changes, which
    // was triggering full page reloads mid-test and breaking E2E runs.
    watch: {
      ignored: ['**/cypress/screenshots/**', '**/cypress/downloads/**', '**/cypress/videos/**'],
    },
  },
});