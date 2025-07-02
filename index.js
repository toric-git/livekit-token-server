import express from "express";
import { AccessToken } from "livekit-server-sdk";

const app = express();

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;

app.get("/get-token", (req, res) => {
  const { roomName, userName } = req.query;

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: userName,
  });

  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();

  res.send({ token });
});

export default app;