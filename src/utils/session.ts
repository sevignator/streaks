import { getCookie, setCookie } from "@tanstack/react-start/server";
import { getIronSession } from "iron-session";

import { env } from "../env";
import { type User } from "#/db/schema.ts";

interface SessionData {
  userId?: User["userId"];
  email?: User["email"];
}

type Session = Awaited<ReturnType<typeof getAppSession>>;

export function getAppSession(ttl = 7 * 24 * 60 * 60) {
  const password = env.SESSION_SECRET;
  if (!password) {
    throw new Error("Missing SESSION_SECRET. Set it in your environment before using sessions.");
  }

  return getIronSession<SessionData>(
    { read: getCookie, write: setCookie },
    {
      cookieName: "app-session",
      password,
      ttl,
      cookieOptions: {
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
        path: "/",
      },
    },
  );
}

export async function updateAppSession(session: Session, data: SessionData) {
  session.userId = data.userId;
  session.email = data.email;

  await session.save();
}

export function clearAppSession(session: Session) {
  session.destroy();
}
