import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const analyticsRouter = createTRPCRouter({
    // seedData: protectedProcedure.input(
    //         createdAt: z.date(),
    //         time: z.number(),
    //         year1: z.number(),
    //         year2: z.number(),
    //         year3: z.number(),
    //         year4: z.number(),
    // ).mutation(async ({ ctx, input }) => {
    //     try {
    //         const createdData = await Promise.all(
    //             input.map(async (item) => {
    //                 return ctx.db.analytics.create({
    //                     data: {
    //                         createdAt: item.createdAt,
    //                         time: item.time,
    //                         year1: item.year1,
    //                         year2: item.year2,
    //                         year3: item.year3,
    //                         year4: item.year4,
    //                     },
    //                 });
    //             })
    //         );

    //         // Handle the created data if needed

    //     } catch (error) {
    //         console.error("Error seeding data for analytics:", error);
    //         throw new Error("Error seeding data for analytics");
    //     }
    // }),
});
