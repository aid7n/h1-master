import { RemoteInfo, Socket } from "dgram";
import { IServerItem, TAcceptableCmds } from "../interfaces";
import { getParams } from "../utils/command";
import { log } from "../utils/logger";
import { getDedicatedServers } from "./server";

const eot = Buffer.from("454f54000000", "hex");
const blankHeader = Buffer.from([0xff, 0xff, 0xff, 0xff]);

const buildGetServersResData = (servers: IServerItem[]) => {
  const delimiter = Buffer.from("\\", "binary");
  const commandName = Buffer.from("getserversResponse ");

  let responseData = Buffer.concat([blankHeader, commandName, delimiter]);

  servers.forEach((server) => {
    const ipBuffer = Buffer.from(server.ipParts);
    const portBuffer = Buffer.alloc(2);
    portBuffer.writeUInt16BE(server.port, 0);
    responseData = Buffer.concat([responseData, ipBuffer, portBuffer]);
    responseData = Buffer.concat([responseData, delimiter]);
  });

  responseData = Buffer.concat([responseData, eot]);

  return responseData;
};

export const sendResponse = (
  rinfo: RemoteInfo,
  server: Socket,
  cmd: TAcceptableCmds,
  fullMsg: Buffer
) => {
  const { address: addr, port } = rinfo;
  const msgStr = fullMsg.toString() ?? "";

  switch (cmd) {
    case "getservers": {
      const [game, protocol, full, empty] = getParams(fullMsg);
      log(`game :: ${game}`);
      log(`protocol :: ${protocol}`);
      log(`full :: ${full === "full"}`);
      log(`empty :: ${empty === "empty"}`);
      const responseData = buildGetServersResData(
        getDedicatedServers(full === "full", empty === "empty")
      );

      server.send(responseData, port, addr, (err) => {
        if (err) {
          log(`error sending response to ${addr}:${port} - ${err}`);
        } else {
          log(`response sent to ${addr}:${port}`);
        }
      });
    }
    default: {
      // do nothing
    }
  }
};
