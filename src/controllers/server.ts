import { createSocket } from "dgram";
import { serverCfg } from "../cfg/server";
import { TAcceptableCmds } from "../interfaces";
import { sendResponse } from "../services/response";
import { buildServerList } from "../services/server";
import { checkCmd } from "../utils/command";
import { log } from "../utils/logger";

const { udpPort, listFetchTime } = serverCfg;

const server = createSocket("udp4");

server.on("message", (msg, rinfo) => {
  const { address: addr, port } = rinfo;
  log(`received message from ${addr}:${port}`);

  // cmd handler
  const cmd: null | TAcceptableCmds = checkCmd(msg);
  if (cmd) {
    log(`message from ${addr}:${port} contains command "${cmd}"`);
    sendResponse(rinfo, server, cmd, msg);
  }
});

export const startServer = async (): Promise<void> => {
  server.bind(udpPort, async () => {
    log(`UDP server listening on port ${udpPort}`);
    await buildServerList();
    setInterval(buildServerList, listFetchTime);
  });
};
