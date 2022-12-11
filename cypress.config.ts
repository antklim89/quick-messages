import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';


export default defineConfig({
    e2e: {
        testIsolation: false,
        specPattern: 'src/layouts/**/*.cy.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3000',
        watchForFileChanges: false,
        setupNodeEvents(on) {
            on('file:preprocessor', vitePreprocessor());
        },
    },

    component: {
        specPattern: 'src/components/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
