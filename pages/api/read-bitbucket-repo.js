const { Bitbucket } = require("bitbucket");
import fetch from "node-fetch";

const clientOptions = {
  baseUrl: "https://api.bitbucket.org/2.0",
  request: {
    timeout: 20,
  },
  auth: {
    username: process.env.BITBUCKET_USERNAME,
    password: process.env.BITBUCKET_SECRET,
  },
};
const bitbucket = new Bitbucket(clientOptions);

async function readRepo() {
  const currentUser = await bitbucket.users.getAuthedUser({});
  if (!currentUser.data.account_id) return false;
  try {
    const { data } = await bitbucket.repositories.listPermissions({});
    const permission = data.values?.[0]?.permission;

    const canWrite = !!(permission === "admin" || "write");
    return !!canWrite;
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  const currentUser = await bitbucket.users.getAuthedUser({});
  console.log({ currentUser });
  try {
    const { data } = bitbucket.repositories.listPermissions({});
    const permission = data.values?.[0]?.permission;

    const canWrite = !!(permission === "admin" || "write");
    res.status(200).json({ currentUser: currentUser.data?.account_id });
    return !!canWrite;
  } catch (e) {
    return false;
  }
}
