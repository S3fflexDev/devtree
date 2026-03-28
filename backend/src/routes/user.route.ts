import {Elysia} from "elysia";
import { jwt } from "@elysiajs/jwt";
import { loginUser, registerUser } from "../scripts/auth/auth.handler";

export const authRoutes = new Elysia({ prefix: "/auth" })

    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
    .post("/register", registerUser)
    .post("/login", loginUser);