/* eslint-disable @typescript-eslint/no-namespace */
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>;
    }
  }
}
