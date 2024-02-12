import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    getUser: publicProcedure
        .input(z.object({ name: z.string(), password: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                console.log(input.name, input.password);
                const user = await ctx.db.user.findUnique({
                    where: {
                        name: input.name,
                        password: input.password,
                    },
                });
                // if (!user) {
                //     throw new Error("No user found");
                // }
                return user;
            } catch (error) {
                console.error("Error getting user", error);
                throw new Error("Error getting user");
            }
        }),
});
