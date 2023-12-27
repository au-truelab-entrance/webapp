import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const websocketRouter = createTRPCRouter({

  greeting: protectedProcedure.query(() => 'hello tRPC v10!'),

})
