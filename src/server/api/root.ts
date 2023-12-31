import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";

import {studentRouter} from "~/server/api/routers/student"
import { websocketRouter } from "./routers/websocket";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  student: studentRouter,
  websocket: websocketRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
