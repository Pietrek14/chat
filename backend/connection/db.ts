import { Client } from "https://deno.land/x/mysql/mod.ts";
import { config } from "../deps.ts";

const dbClient = await new Client().connect({
	hostname: config().DB_HOST || "localhost",
	username: config().DB_USER || "root",
	db: config().DB_NAME || "chat",
	password: config().DB_PASSWORD || "",
});

export default dbClient;