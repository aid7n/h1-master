import { IServerCfg, IServerItem } from "../interfaces";

// this is actually required for the response to be parsed correctly by the client...
const mandatoryPart: IServerItem = {
  ipParts: [112, 111, 110, 115],
  port: 25888,
  full: false,
  empty: false,
};

export const serverCfg: IServerCfg = {
  game: "H1",
  protocol: 2,
  udpPort: 20810,
  listFetchTime: 1000 * 60 * 5,
  raidmaxApiUrl: "http://api.raidmax.org:5000/servers",
  mandatoryServerParts: [mandatoryPart],
};