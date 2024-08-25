import axios from "axios";
import { load } from "cheerio";
import { serverCfg } from "../cfg/server";
import { IServerItem, TAcceptableGameNames } from "../interfaces";
import { formatIpv4, ipRegex } from "../utils/ip";
import { log } from "../utils/logger";
import { resolveHost } from "./dns";

const { game, raidmaxApiUrl, mandatoryServerParts } = serverCfg;

let dedicatedServers: IServerItem[] = [];

const fetchRaidmax = async (
  game: TAcceptableGameNames = "H2M",
  showFull: boolean = true,
  showEmpty: boolean = true
) => {
  try {
    log("fetching Raidmax data");
    const servers: IServerItem[] = [];
    const { data } = await axios.get(raidmaxApiUrl);
    const $ = load(data);

    $(`#${game}_servers .server-row`).each((_, element) => {
      let full = false;
      let empty = false;
      const ip = $(element).attr("data-ip") ?? "0.0.0.0";
      const port = $(element).attr("data-port") ?? "3000";

      $(element).each((_, td) => {
        const cn = $(td).attr("data-clientnum") ?? null;
        const maxCn = $(td).attr("data-maxclientnum") ?? null;

        if (cn && maxCn) {
          if (cn === "0") {
            empty = true;
          }
          if (cn === maxCn) {
            full = true;
          }
        }
      });

      if (ipRegex.test(ip)) {
        servers.push({
          ipParts: formatIpv4(ip),
          port: parseInt(port),
          full,
          empty,
        });
      } else {
        if (!ip.includes(":")) {
          resolveHost(ip, (err, address, family) => {
            if (!err && family === 4 && ipRegex.test(address)) {
              servers.push({
                ipParts: formatIpv4(address),
                port: parseInt(port),
                full,
                empty,
              });
            }
          });
        }
      }
    });

    log("fetched Raidmax data successfully");
    return servers;
  } catch (error) {
    log("error fetching Raidmax data: " + error);
    return null;
  }
};

export const buildServerList = async () => {
  const finalServerList: IServerItem[] = [...mandatoryServerParts];
  const raidmaxServers: IServerItem[] | null = await fetchRaidmax(game);

  if (raidmaxServers) {
    finalServerList.push(...raidmaxServers);
  }

  dedicatedServers = finalServerList;
};

export const getDedicatedServers = (showFull: boolean, showEmpty: boolean) =>
  [...dedicatedServers].flatMap((ds: IServerItem) => {
    if (!showFull && ds.full) {
      return [];
    }
    if (!showEmpty && ds.empty) {
      return [];
    }
    return ds;
  });
