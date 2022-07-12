const { Bitbucket } = require("bitbucket");
import fetch from "node-fetch";

const clientOptions = {
  baseUrl: "https://api.bitbucket.org/2.0",
  // request: {
  //   timeout: 20,
  // },
  auth: {
    username: process.env.BITBUCKET_USERNAME,
    password: process.env.BITBUCKET_SECRET,
  },
};
const bitbucket = new Bitbucket(clientOptions);

async function readRepo() {
  // TODO
}

export default async function handler(req, res) {
  try {
    // do stuff
    const currentUser = await bitbucket.users.getAuthedUser({});
    res.status(200).json({ currentUser: currentUser });
  } catch (e) {
    return e;
  }
}
