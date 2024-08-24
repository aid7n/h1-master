import { lookup } from "dns";

export const resolveHost = (
  host: string,
  callback: (
    err: NodeJS.ErrnoException | null,
    address: string,
    family: number
  ) => void
) => {
  lookup(host, callback);
};
