import { defineConfig } from 'cypress';


export default defineConfig({
    e2e: {
        specPattern: 'src/layouts/**/*.cy.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3000',
    },

    component: {
        specPattern: 'src/components/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
