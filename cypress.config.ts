import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';


export default defineConfig({
    e2e: {
        testIsolation: true,
        specPattern: 'src/layouts/**/*.cy.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3000',
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
