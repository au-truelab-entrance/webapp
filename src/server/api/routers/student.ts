import {
    createTRPCRouter,
    protectedProcedure,
  } from "~/server/api/trpc";

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
    })

})