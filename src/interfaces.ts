export interface IServerItem {
  ipParts: number[];
  port: number;
  full: boolean;
  empty: boolean;
}

export interface IServerCfg {
  game: TAcceptableGameNames;
  protocol: 2;
  udpPort: number;
  listFetchTime: number;
  raidmaxApiUrl: string;
  mandatoryServerParts: IServerItem[];
}

export type TAcceptableCmds = "getservers";
export type TAcceptableGameNames =
  | "H1"
  | "H2M"
  | "IW3"
  | "IW4"
  | "IW5"
  | "IW6"
  | "T4"
  | "T5"
  | "T6"
  | "T7";
