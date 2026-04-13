
import {links, users} from "../../db/schema";
import { eq } from "drizzle-orm";
import {db} from "../../db";

export async function createLink({ body, headers, set, jwt }: any) {

    // Añadir datos (title*, etc...) en el body aplication/json

    const authHeader = headers.authorization;

    if (!authHeader) {
        set.status = 401;
        return { error: "Token requerido" };
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = await jwt.verify(token);

    const foundUsers = await db
        .select()
        .from(users)
        .where(eq(users.id, Number(payload.sub)));

    if (foundUsers.length === 0) {
        set.status = 404;
        return { error: "Usuario no encontrado" };
    }

    const user = foundUsers[0];

    try {
        const createdLink = await db.insert(links).values({
            userId: user.id,
            url: user.username,
            title: "test string"
        });

    } catch (err) {
        set.status = 404;
    }
}