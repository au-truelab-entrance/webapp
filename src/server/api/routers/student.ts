import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const studentRouter = createTRPCRouter({

    check: protectedProcedure
        .query(async ({ ctx }) => {
            const studentID: string | undefined = ctx.session.user.email?.slice(1, 8);

            if (!studentID) {
                throw new Error('Unable to determine student ID');
            }

            const parsedStudentID: number = parseInt(studentID, 10);

            if (isNaN(parsedStudentID)) {
                throw new Error('Invalid student ID format');
            }

            const student = await ctx.db.student.findUnique({
                where: { studentID: parsedStudentID }
            });

            return !!student;
        }),


    create: protectedProcedure
        .input(z.array(z.object({
            studentID: z.string(),
            startTime: z.string(),
            endTime: z.string(),
        })))
        .mutation(async ({ ctx, input }) => {
            try {
                console.log(input);

                // Use Promise.all to wait for all student creations to complete
                const createdStudents = await Promise.all(
                    input.map(async (item) => {
                        // console.log(item.studentID);
                        // console.log(item.startTime);
                        // console.log(item.endTime);
                        return ctx.db.student.create({
                            data: {
                                studentID: parseInt(item.studentID, 10),
                                startTime: item.startTime,
                                endTime: item.endTime,
                            },
                        });
                    })
                );

                console.log('Students created successfully:', createdStudents);

                return createdStudents;
            } catch (error) {
                console.error('Error creating students:', error);
                throw new Error('Error creating students');
            }
        }),
})