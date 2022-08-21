import { defineConfig } from 'cypress';


export default defineConfig({
    e2e: {
        specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3000',
        env: {
            IS_EMULATOR: true,
        },
    },
});
