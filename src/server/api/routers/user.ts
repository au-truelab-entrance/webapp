import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    getUser: publicProcedure
        .input(z.object({ name: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const user = await ctx.db.user.findUnique({
                    where: {
                        name: input.name,
                    },
                });
                if (!user) {
                    throw new Error("No user found");
                }
                return user;
            } catch (error) {
                throw new Error("Error finding user: " + error.message);
            }
        }),
});
