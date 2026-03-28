import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts', // Dónde están tus tablas en TypeScript
    out: './drizzle',             // Dónde guardará el historial de cambios
    dialect: 'postgresql',        // El motor de DB
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Coge la URL de tu .env automáticamente
    },
    verbose: true,
    strict: true,
});