import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const studentRouter = createTRPCRouter({
    check: protectedProcedure.query(async ({ ctx }) => {
        const studentID: string | undefined = ctx.session.user.email?.slice(
            1,
            8,
        );

        if (!studentID) {
            throw new Error("Unable to determine student ID");
        }

        const parsedStudentID: number = parseInt(studentID, 10);

        if (isNaN(parsedStudentID)) {
            throw new Error("Invalid student ID format");
        }

        const student = await ctx.db.student.findUnique({
            where: { studentID: parsedStudentID },
        });

        return !!student;
    }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.student.findMany();
    }),

    update: protectedProcedure
        .input(
            z.object({
                studentID: z.number(),
                startTime: z.string(),
                endTime: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const updatedStudent = await ctx.db.student.update({
                    where: {
                        studentID: input.studentID,
                    },
                    data: {

                        startTime: input.startTime,
                        endTime: input.endTime,
                    },
                });

                console.log("Student updated successfully:", updatedStudent);

                return updatedStudent;
            } catch (error) {
                console.error("Error updating student:", error);
                throw new Error("Error updating student");
            }
        }),

    deleteById: protectedProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            try {
                const deletedStudent = await ctx.db.student.delete({
                    where: {
                        studentID: input,
                    },
                });

                console.log("Student deleted successfully:", deletedStudent);

                return deletedStudent;
            } catch (error) {
                console.error("Error deleting student:", error);
                throw new Error("Error deleting student");
            }
        }),

    create: protectedProcedure
        .input(
            z.array(
                z.object({
                    studentID: z.number(),
                    startTime: z.string(),
                    endTime: z.string(),
                }),
            ),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const createdStudents = await Promise.all(
                    input.map(async (item) => {
                        return ctx.db.student.create({
                            data: {
                                studentID: item.studentID,
                                startTime: item.startTime,
                                endTime: item.endTime,
                            },
                        });
                    }),
                );

                console.log("Students created successfully:", createdStudents);

                return createdStudents;
            } catch (error) {
                console.error("Error creating students:", error);
                throw new Error("Error creating students");
            }
        }),
});
