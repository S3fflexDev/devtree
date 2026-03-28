import { Elysia } from "elysia";
import { db } from "./db";           // Importamos la conexión a tu base de datos
import { users } from "./db/schema"; // Importamos la tabla de usuarios
import { cors } from "@elysiajs/cors";
import {authRoutes} from "./routes/user.route";

const app = new Elysia()

    .use(cors())

    // 1. Ruta de prueba (Para saber que el server funciona)
    .get("/", () => {
        return { message: "¡API de DevTree funcionando!" };
    })

    // 2. Ruta para ver los usuarios de la base de datos
    .get("/users", async () => {
        // Magia de Drizzle: Trae todos los usuarios de Postgres
        const allUsers = await db.select().from(users);
        return allUsers;
    })

    .use(authRoutes)

    // Encendemos el servidor en el puerto 3000
    .listen(3001);

console.log(
    `El backend está activo en http://${app.server?.hostname}:${app.server?.port}`
);