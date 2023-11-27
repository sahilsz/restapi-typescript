import { FilterQuery } from "mongoose";

import Session, { SessionDocument } from "../models/session.model";

export async function createUserSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean(); // lean returns the plain object
}
