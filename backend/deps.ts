import { Application, Router, Context } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Client as sqlClient } from "https://deno.land/x/mysql@v2.10.2/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.0.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

// import { createRequire } from "https://deno.land/std/node/module.ts";

// const require = createRequire(import.meta.url);
// const socketIO = require("socket.io");

export { Router, Application, Context, oakCors, sqlClient, config, SMTPClient, bcrypt, nanoid, /* socketIO */ };