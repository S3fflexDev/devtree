import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import {db} from "../../db";

// Funciones de los endpoints relacionados con el inicio y registro de sesión
export async function registerUser({ body, jwt, set }: any) {

    console.log("Cuerpo recibido:", body);
    if (!body) return { error: "No me has mandado nada en el body" };
    const { username, password, email } = body;

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

    if (existingUser.length > 0) {
        set.status = 409;
        return { error: "El usuario ya existe" };
    }

    const hashedPass = await Bun.password.hash(password);

    try {

        const createdUser = await db.insert(users).values({
            username: username,
            password: hashedPass,
            email: email,
        }).returning();

        const newUser = createdUser[0]

        const token = await jwt.sign({
            sub: newUser.id
        });

        return {
            message: "Usuario creado",
            token: token,
            userId: newUser.id
        };

    } catch {
        set.status = 400;
        return { error: "Hubo un error crítico" };
    }
}

export async function loginUser({ body, jwt, set }: any) {
    const { email, password } = body;

    const foundUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

    if (foundUsers.length === 0) {
        set.status = 404;
        return { error: "Usuario no encontrado" };
    }

    const user = foundUsers[0];

    const verifyPass = await Bun.password.verify(password, user.password);

    if (!verifyPass) {
        set.status = 404;
        return { error: "Contraseña incorrecta" };
    } else {

        const token = await jwt.sign({
            sub: user.id
        });

        return { token: token };

    }
}