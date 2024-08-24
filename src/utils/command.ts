import { TAcceptableCmds } from "../interfaces";

const blankHeader = Buffer.from([0xff, 0xff, 0xff, 0xff]);

export const checkCmd = (msg: Buffer): TAcceptableCmds | null => {
  const msgStr = msg.toString() ?? "";

  if (msgStr.startsWith(`${blankHeader}getservers`)) {
    return "getservers";
  }

  return null;
};

export const getParams = (msg: Buffer): string[] => {
  const cmd = checkCmd(msg);

  if (cmd) {
    const msgStr = msg.toString() ?? "";
    const omittedCmd = msgStr.substring(msgStr.indexOf(cmd) + cmd.length + 1);
    return omittedCmd.split(" ");
  } else {
    return [];
  }
};
