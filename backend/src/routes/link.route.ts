import {Elysia} from "elysia";
import {jwt} from "@elysiajs/jwt";
import {createLink} from "../scripts/link/link.handler";

export const linkRoutes = new Elysia({ prefix: "/link" })

    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
    .post("/create", createLink)