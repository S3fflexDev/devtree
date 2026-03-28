import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { loginUser, registerUser } from "../scripts/auth/auth.handler";
import {users} from "../db/schema";
import {eq} from "drizzle-orm";
import {db} from "../db";

export const authRoutes = new Elysia({ prefix: "/auth" })

    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
    .post("/register", registerUser, {
        body: t.Object({
            username: t.String(),
            password: t.String()
        })
    })
    .post("/login", loginUser)
    .get("/me", async ({ headers, jwt, set }) => {
        const authHeader = headers.authorization;

        if (!authHeader) {
            set.status = 401;
            return { error: "Token requerido" };
        }

        const token = authHeader.replace("Bearer ", "");
        const payload = await jwt.verify(token);

        if (!payload || !payload.sub) {
            set.status = 401;
            return { error: "Token inválido" };
        }

        const foundUsers = await db
            .select()
            .from(users)
            .where(eq(users.id, Number(payload.sub)));

        if (foundUsers.length === 0) {
            set.status = 404;
            return { error: "Usuario no encontrado" };
        }

        const user = foundUsers[0];

        return {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
        };
    });