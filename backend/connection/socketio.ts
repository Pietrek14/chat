import { socketIO } from "../deps.ts";

const io = new socketIO.Server(3001);

export default io;