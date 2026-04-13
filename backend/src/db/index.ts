
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Cogemos la URL de la base de datos del archivo .env
const connectionString = process.env.DATABASE_URL!;

// Creamos el cliente de Postgres
const client = postgres(connectionString);

// Exportamos la base de datos lista para usar en cualquier parte de la app
export const db = drizzle(client, { schema });