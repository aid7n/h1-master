export const formatIpv4 = (ip: string) => {
  return ip.split(".").map((p) => parseInt(p)) ?? [0, 0, 0, 0];
};

export const ipRegex =
  /\b((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]?[0-9])\b/;
