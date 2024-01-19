import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from 'zod';

const analyticsInputSchema = z.array(
    z.array(z.union([z.date(), z.string(), z.number(), z.number(), z.number(), z.number()]))
);

interface AnalyticsData {
    createdAt: Date;
    year1: number;
    year2: number;
    year3: number;
    year4: number;
}

export const analyticsRouter = createTRPCRouter({
    seedData: protectedProcedure.input(analyticsInputSchema).mutation(async ({ ctx, input }) => {
        try {
            const createdData = await Promise.all(
                input.map(async (item) => {
                    const [createdAt, year1, year2, year3, year4] = item;

                    const analyticsData = {
                        createdAt: createdAt,
                        year1,
                        year2,
                        year3,
                        year4,
                    } as AnalyticsData;

                    return ctx.db.analytics.create({
                        data: analyticsData,
                    });
                })
            );

            console.log("Seed successfully:", createdData);

        } catch (error) {
            console.error("Error seeding data for analytics:", error);
            throw new Error("Error seeding data for analytics");
        }
    }),
});
