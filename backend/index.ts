import { Application } from "./deps.ts";

const env = Deno.env.toObject()
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';